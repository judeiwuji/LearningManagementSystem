import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/models/Pagination';
import { StudentQuizResult } from 'src/app/models/QuizResult';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-student-quiz-results',
  templateUrl: './student-quiz-results.component.html',
  styleUrls: ['./student-quiz-results.component.css'],
})
export class StudentQuizResultsComponent {
  loading = false;
  pager: Pagination<StudentQuizResult> = {
    page: 1,
    results: [],
    totalPages: 0,
  };
  searchTerm = '';

  constructor(
    private readonly toastr: ToastrService,
    private readonly quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(page = 1) {
    if (this.loading) return;

    this.loading = true;
    const sub = this.quizService
      .getStudentQuizResults(page, this.searchTerm)
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
}
