import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Quiz } from 'src/app/models/Quiz';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz-intro',
  templateUrl: './quiz-intro.component.html',
  styleUrls: ['./quiz-intro.component.css'],
})
export class QuizIntroComponent {
  quiz?: Quiz;
  loading = true;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly quizService: QuizService,
    private readonly toastr: ToastrService
  ) {
    const classRoomId = Number(this.activatedRoute.snapshot.params['cid']);
    const quizId = Number(this.activatedRoute.snapshot.params['id']);
    this.getQuiz(classRoomId, quizId);
  }

  getQuiz(classRoomId: number, quizId: number) {
    this.quizService.getQuiz(classRoomId, quizId).subscribe({
      next: (response) => {
        this.loading = false;
        this.quiz = response;
      },
      error: (err) => {
        this.loading = false;
        this.toastr.warning(err.error.error || err.statusText);
      },
    });
  }
}
