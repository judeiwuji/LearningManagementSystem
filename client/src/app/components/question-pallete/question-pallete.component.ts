import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuizQuestion } from 'src/app/models/Question';

@Component({
  selector: 'app-question-pallete',
  templateUrl: './question-pallete.component.html',
  styleUrls: ['./question-pallete.component.css'],
})
export class QuestionPalleteComponent implements OnInit {
  @Input()
  questions: QuizQuestion[] = [];

  @Input()
  currentIndex: number = 0;

  @Output()
  onSelect = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  select(value: number) {
    this.onSelect.emit(value);
  }
}
