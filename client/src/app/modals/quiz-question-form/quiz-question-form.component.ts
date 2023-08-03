import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import {
  QuizQuestion,
  QuizQuestionActionRequest,
} from 'src/app/models/Question';
import { QuestionOption } from 'src/app/models/QuestionOption';
import { QuestionOptionService } from 'src/app/services/question-option.service';
import { QuizQuestionService } from 'src/app/services/quiz-question.service';

@Component({
  selector: 'app-quiz-question-form',
  templateUrl: './quiz-question-form.component.html',
  styleUrls: ['./quiz-question-form.component.css'],
})
export class QuizQuestionFormComponent {
  @Input()
  data?: QuizQuestion;
  @Input()
  quizId!: number;

  dataForm!: FormGroup;
  processing = false;
  processingOption = false;
  options: QuestionOption[] = [];
  answer?: string;
  faTrashAlt = faTrashAlt;

  constructor(
    private readonly activeModal: NgbActiveModal,
    private readonly toastr: ToastrService,
    private readonly quizQuestionService: QuizQuestionService,
    private readonly questionOptionService: QuestionOptionService
  ) {}

  ngOnInit(): void {
    this.dataForm = new FormGroup({
      question: new FormControl(this.data?.question, [Validators.required]),
    });

    this.data && (this.answer = this.data.answer);
    this.data && (this.options = this.data.options);
  }

  close() {
    this.activeModal.close();
  }

  get fc() {
    return this.dataForm.controls;
  }

  save() {
    this.dataForm.markAllAsTouched();
    if (this.dataForm.invalid) {
      this.toastr.warning('Some fields are empty');
      return;
    }

    if (this.options.length < 2) {
      this.toastr.warning('You must add at least 2 options', '', {
        timeOut: 3000,
      });
      return;
    }

    if (!this.answer) {
      this.toastr.warning('You must select an answer from the options', '', {
        timeOut: 5000,
      });
      return;
    }

    const request: QuizQuestionActionRequest = {
      question: this.fc['question'].value as string,
      answer: this.answer,
      options: this.options.map((d) => d.option),
    };

    if (this.data) {
      this.update(request);
    } else {
      this.create(request);
    }
  }

  update(request: QuizQuestionActionRequest) {
    if (this.processing) return;

    if (this.data) {
      this.processing = true;
      const sub = this.quizQuestionService
        .updateQuestion(this.quizId, this.data?.id as number, request)
        .subscribe({
          next: (response) => {
            sub.unsubscribe();
            if (this.data) {
              this.data.question = response.question;
              this.data.answer = this.answer;
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

  create(request: QuizQuestionActionRequest) {
    if (this.processing) return;

    this.processing = true;
    const sub = this.quizQuestionService
      .createQuestion(this.quizId, request)
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

  onAddOption(option: string) {
    if (!option) return;

    if (this.data) {
      if (this.processingOption) return;
      this.processingOption = true;
      this.questionOptionService
        .addOption(this.data.id, {
          option,
          questionId: this.data.id,
        })
        .subscribe({
          next: (response) => {
            this.processingOption = false;
            this.options.push(response);
          },
          error: (err) => {
            this.processingOption = false;
            this.toastr.clear();
            this.toastr.warning(err.error.error || err.statusText);
          },
        });
    } else {
      this.options.push({ id: Date.now() * -1, option: option.trim() });
    }
  }

  onRemoveOption(option: QuestionOption) {
    if ((option?.id as number) < 0) {
      this.removeOption(option.id as number);
      return;
    }

    option.processing = true;
    const sub = this.questionOptionService
      .removeOption(this.data?.id as number, option?.id as number)
      .subscribe({
        next: () => {
          sub.unsubscribe();
          this.removeOption(option?.id as number);
        },
        error: (err) => {
          this.toastr.clear();
          this.toastr.warning(err.error.error || err.statusText);
        },
      });
  }

  removeOption(id: number) {
    const index = this.options.findIndex((d) => d.id === id);
    if (index !== -1) {
      this.options.splice(index, 1);
    }
  }

  setAnswer(option: string) {
    this.answer = option;
  }
}
