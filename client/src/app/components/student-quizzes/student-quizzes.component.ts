import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/models/Pagination';
import { StudentQuiz } from 'src/app/models/Quiz';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-student-quizzes',
  templateUrl: './student-quizzes.component.html',
  styleUrls: ['./student-quizzes.component.css'],
})
export class StudentQuizzesComponent {
  loading = false;
  pager: Pagination<StudentQuiz> = {
    page: 1,
    results: [],
    totalPages: 0,
  };
  searchTerm = '';

  constructor(
    private readonly toastr: ToastrService,
    private readonly router: Router,
    private readonly quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(page = 1) {
    if (this.loading) return;

    this.loading = true;
    const sub = this.quizService
      .getStudentQuizzes(page, this.searchTerm)
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

  onTakeQuiz(quiz: StudentQuiz) {
    // check if user have taken the quiz
    this.router.navigateByUrl(`/quiz/intro/${quiz.classRoomId}/${quiz.id}`);
  }
}
