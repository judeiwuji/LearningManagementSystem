import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCheck, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Quiz } from 'src/app/models/Quiz';
import { QuizStatus } from 'src/app/models/enums/QuizStatus';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz-status',
  templateUrl: './quiz-status.component.html',
  styleUrls: ['./quiz-status.component.css'],
})
export class QuizStatusComponent {
  @Input()
  quiz!: Quiz;

  faChevronDown = faChevronDown;
  faCheck = faCheck;

  QuizStatus = QuizStatus;

  constructor(
    private readonly quizService: QuizService,
    private readonly toastr: ToastrService
  ) {}

  select(status: QuizStatus) {
    if (this.quiz.processing) return;

    this.quiz.processing = true;
    this.quizService
      .updateQuiz(this.quiz.classRoomId, this.quiz.id, { status })
      .subscribe({
        next: (response) => {
          this.quiz.processing = false;
          this.quiz.status = status;
        },
        error: (err) => {
          this.quiz.processing = false;
          this.toastr.clear();
          this.toastr.warning(err.error.error || err.statusText);
        },
      });
  }
}
