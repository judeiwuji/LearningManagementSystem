import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { QuizQuestionFormComponent } from 'src/app/modals/quiz-question-form/quiz-question-form.component';
import { QuizResultsComponent } from 'src/app/modals/quiz-results/quiz-results.component';
import { Classroom } from 'src/app/models/ClassRoom';
import { Pagination } from 'src/app/models/Pagination';
import { QuizQuestion } from 'src/app/models/Question';
import { Quiz } from 'src/app/models/Quiz';
import { QuizQuestionService } from 'src/app/services/quiz-question.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.css'],
})
export class QuizDetailComponent {
  loading = false;
  pager: Pagination<QuizQuestion> = {
    page: 1,
    results: [],
    totalPages: 0,
  };
  searchTerm = '';
  quizId: number;
  classRoomId: number;
  quiz?: Quiz;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly toastr: ToastrService,
    private readonly modal: NgbModal,
    private readonly quizQuestionService: QuizQuestionService,
    private readonly quizService: QuizService
  ) {
    this.quizId = Number(this.activatedRoute.snapshot.params['qid']);
    this.classRoomId = Number(this.activatedRoute.snapshot.params['id']);
  }

  ngOnInit(): void {
    this.loadData();

    this.quizService.getQuiz(this.classRoomId, this.quizId).subscribe({
      next: (response) => {
        this.quiz = response;
      },
    });
  }

  loadData(page = 1) {
    if (this.loading) return;

    this.loading = true;
    const sub = this.quizQuestionService
      .getQuestions(this.quizId, page, this.searchTerm)
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
    const instance = this.modal.open(QuizQuestionFormComponent, {
      size: 'md',
      backdrop: 'static',
    });

    instance.componentInstance.data = null;
    instance.componentInstance.quizId = this.quizId;

    instance.result.then((data) => {
      if (data) {
        this.pager.results.unshift(data);
      }
    });
  }

  onEdit(data: QuizQuestion) {
    const instance = this.modal.open(QuizQuestionFormComponent, {
      size: 'md',
      backdrop: 'static',
    });

    instance.componentInstance.data = data;
    instance.componentInstance.quizId = this.quizId;
  }

  onDelete(data: QuizQuestion) {
    if (data.processing) return;

    data.processing = true;
    const sub = this.quizQuestionService
      .deleteQuestion(this.quizId, data.id)
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

  viewResults() {
    const instance = this.modal.open(QuizResultsComponent, {
      size: 'lg',
      fullscreen: true,
    });

    instance.componentInstance.quiz = this.quiz;
  }
}
