import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { QuizFormComponent } from 'src/app/modals/quiz-form/quiz-form.component';
import { Pagination } from 'src/app/models/Pagination';
import { Quiz } from 'src/app/models/Quiz';
import { QuizService } from 'src/app/services/quiz.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css'],
})
export class QuizzesComponent {
  loading = false;
  pager: Pagination<Quiz> = {
    page: 1,
    results: [],
    totalPages: 0,
  };
  searchTerm = '';
  classRoomId!: number;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly toastr: ToastrService,
    private readonly modal: NgbModal,
    private readonly quizService: QuizService
  ) {
    this.classRoomId = Number(this.activatedRoute.snapshot.params['id']);
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(page = 1) {
    if (this.loading) return;

    this.loading = true;
    const sub = this.quizService
      .getQuizzes(this.classRoomId, page, this.searchTerm)
      .subscribe({
        next: (response) => {
          sub.unsubscribe();
          this.loading = false;
          this.pager.page = page;
          this.pager.results.push(...response.results);
          this.pager.totalPages = response.totalPages;
        },
        error: (err) => {
          this.loading = false;
          this.toastr.warning(err.error.error || err.statusText);
        },
      });
  }

  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.pager = {
      page: 1,
      results: [],
      totalPages: 0,
    };
    this.loadData();
  }

  onAdd() {
    const instance = this.modal.open(QuizFormComponent, {
      size: 'md',
      backdrop: 'static',
    });

    instance.componentInstance.data = null;
    instance.componentInstance.classRoomId = this.classRoomId;

    instance.result.then((data) => {
      if (data) {
        this.pager.results.unshift(data);
      }
    });
  }

  onEdit(data: Quiz) {
    const instance = this.modal.open(QuizFormComponent, {
      size: 'md',
      backdrop: 'static',
    });

    instance.componentInstance.data = data;
    instance.componentInstance.classRoomId = this.classRoomId;
  }

  onDelete(data: Quiz) {
    if (data.processing) return;

    data.processing = true;
    const sub = this.quizService
      .deleteQuiz(this.classRoomId, data.id)
      .subscribe({
        next: () => {
          sub.unsubscribe();
          data.processing = false;
          const index = this.pager.results.findIndex((d) => d.id === data.id);
          if (index !== -1) {
            this.pager.results.splice(index, 1);
          }
        },
        error: (err) => {
          data.processing = false;
          this.toastr.clear();
          this.toastr.warning(err.error.error || err.statusText);
        },
      });
  }
}
