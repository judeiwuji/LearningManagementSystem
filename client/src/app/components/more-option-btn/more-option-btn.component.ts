import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-more-option-btn',
  templateUrl: './more-option-btn.component.html',
  styleUrls: ['./more-option-btn.component.css'],
})
export class MoreOptionBtnComponent {
  faPen = faPen;
  faTrashAlt = faTrashAlt;

  @Output()
  onEdit = new EventEmitter<boolean>();

  @Output()
  onDelete = new EventEmitter<boolean>();

  @Input()
  loading?: boolean = false;

  selectEdit() {
    this.onEdit.emit(true);
  }

  selectDelete() {
    this.onDelete.emit(true);
  }
}
