import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/models/Pagination';
import { Quiz } from 'src/app/models/Quiz';
import { QuizResult } from 'src/app/models/QuizResult';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.css'],
})
export class QuizResultsComponent implements OnInit {
  @Input()
  quiz!: Quiz;

  loading = false;
  pager: Pagination<QuizResult> = {
    page: 1,
    results: [],
    totalPages: 0,
  };
  searchTerm = '';

  constructor(
    private readonly activeModal: NgbActiveModal,
    private readonly toastr: ToastrService,
    private readonly quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  close() {
    this.activeModal.close();
  }

  loadData(page = 1) {
    if (this.loading) return;

    this.loading = true;
    const sub = this.quizService
      .getQuizResults(this.quiz.id, page, this.searchTerm)
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
}
