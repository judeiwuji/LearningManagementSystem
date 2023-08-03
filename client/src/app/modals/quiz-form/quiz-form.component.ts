import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Quiz, QuizActionRequest } from 'src/app/models/Quiz';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.css'],
})
export class QuizFormComponent {
  @Input()
  data?: Quiz;

  @Input()
  classRoomId!: number;

  dataForm!: FormGroup;
  processing = false;

  constructor(
    private readonly activeModal: NgbActiveModal,
    private readonly toastr: ToastrService,
    private readonly quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.dataForm = new FormGroup({
      title: new FormControl(this.data?.title, [Validators.required]),
      duration: new FormControl(this.data?.duration, [Validators.required]),
    });
  }

  close() {
    this.activeModal.close();
  }

  get fc() {
    return this.dataForm.controls;
  }

  save() {
    this.dataForm.markAllAsTouched();
    if (this.dataForm.invalid) return;

    const request: QuizActionRequest = {
      title: this.fc['title'].value as string,
      duration: this.fc['duration'].value as number,
      classRoomId: this.classRoomId,
    };
    if (this.data) {
      this.update(request);
    } else {
      this.create(request);
    }
  }

  update(request: QuizActionRequest) {
    if (this.processing) return;

    if (this.data) {
      this.processing = true;
      const sub = this.quizService
        .updateQuiz(this.classRoomId, this.data?.id as number, request)
        .subscribe({
          next: (response) => {
            sub.unsubscribe();
            if (this.data) {
              this.data.duration = response.duration;
              this.data.title = response.title;
            }
            this.processing = false;
            this.close();
          },
          error: (err) => {
            this.toastr.clear();
            this.toastr.warning(err.error.error || err.statusText);
            this.processing = false;
          },
        });
    }
  }

  create(request: QuizActionRequest) {
    if (this.processing) return;

    this.processing = true;
    const sub = this.quizService
      .createQuiz(this.classRoomId, request)
      .subscribe({
        next: (response) => {
          sub.unsubscribe();
          this.activeModal.close(response);
        },
        error: (err) => {
          this.processing = false;
          this.toastr.clear();
          this.toastr.warning(err.error.error || err.statusText);
        },
      });
  }
}
