import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-action-btn',
  templateUrl: './action-btn.component.html',
  styleUrls: ['./action-btn.component.css'],
})
export class ActionBtnComponent {
  @Output()
  onAction = new EventEmitter<boolean>();

  @Input()
  title = 'Press';

  @Input()
  size: 'sm' | 'md' | 'lg' = 'sm';

  @Input()
  loading?: boolean;

  action() {
    this.onAction.emit(true);
  }
}
