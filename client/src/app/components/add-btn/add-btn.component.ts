import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-btn',
  templateUrl: './add-btn.component.html',
  styleUrls: ['./add-btn.component.css'],
})
export class AddBtnComponent {
  @Output()
  onAdd = new EventEmitter<boolean>();

  @Input()
  title = 'Add';

  faPlus = faPlus;

  add() {
    this.onAdd.emit(true);
  }
}
