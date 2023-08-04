import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { map, switchMap } from 'rxjs';
import { MessageBoxComponent } from 'src/app/modals/message-box/message-box.component';
import { QuizQuestion } from 'src/app/models/Question';
import { Quiz } from 'src/app/models/Quiz';
import { StudentQuizResult } from 'src/app/models/QuizResult';
import { QuizQuestionService } from 'src/app/services/quiz-question.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz-main',
  templateUrl: './quiz-main.component.html',
  styleUrls: ['./quiz-main.component.css'],
})
export class QuizMainComponent {
  quiz!: Quiz;
  loading = true;
  index = 0;
  questions: QuizQuestion[] = [];
  processing = false;
  quizResult?: StudentQuizResult;
  timerKey!: string;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly quizService: QuizService,
    private readonly quizQuestionService: QuizQuestionService,
    private readonly toastr: ToastrService,
    private readonly modal: NgbModal,
    private readonly cookieService: CookieService
  ) {
    const classRoomId = Number(this.activatedRoute.snapshot.params['cid']);
    const quizId = Number(this.activatedRoute.snapshot.params['id']);
    this.timerKey = `__quizTimer_${quizId}`;
    this.loadData(classRoomId, quizId);
  }

  loadData(classRoomId: number, quizId: number) {
    this.quizService.getStudentQuizResult(quizId).subscribe({
      next: (response) => {
        if (response) {
          this.loading = false;
          this.quizResult = response;
          return;
        }

        this.quizService
          .getQuiz(classRoomId, quizId)
          .pipe(
            switchMap((quiz) =>
              this.quizQuestionService
                .getQuizQuestions(quizId)
                .pipe(map((questions) => ({ quiz, questions })))
            )
          )
          .subscribe({
            next: (response) => {
              this.loading = false;
              this.quiz = response.quiz;
              this.questions = response.questions;
            },
            error: (err) => {
              this.loading = false;
              this.toastr.warning(err.error.error || err.statusText);
            },
          });
      },
    });
  }

  onTimeOver() {
    this.submit();
  }

  previous() {
    if (this.index > 0) {
      this.index -= 1;
    }
  }

  next() {
    if (this.index < 10) {
      this.index += 1;
    }
  }

  goto(index: number) {
    this.index = index;
  }

  onSelect(question: QuizQuestion) {
    if (question.processing) return;

    question.processing = true;
    const sub = this.quizQuestionService
      .answerQuizQuestion(question.quizId, question.id, {
        answer: question.answer,
      })
      .subscribe({
        next: (response) => {
          sub.unsubscribe();
          question.processing = false;
        },
        error: (err) => {
          question.processing = false;
          this.toastr.clear();
          this.toastr.warning(err.error.error || err.statusText);
        },
      });
  }

  onSubmit() {
    const instance = this.modal.open(MessageBoxComponent, {
      size: 'md',
      backdrop: 'static',
    });

    instance.result.then((response) => {
      this.submit();
    });
  }

  submit() {
    this.quizService.submitQuiz(this.quiz.id).subscribe({
      next: (result) => {
        this.quizResult = result;
        this.cookieService.delete(this.timerKey);
      },
      error: (err) => {
        this.toastr.warning(err.error.error || err.statusText);
      },
    });
  }
}
