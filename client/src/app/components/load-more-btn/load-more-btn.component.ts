import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-load-more-btn',
  templateUrl: './load-more-btn.component.html',
  styleUrls: ['./load-more-btn.component.css'],
})
export class LoadMoreBtnComponent {
  @Output()
  onLoad = new EventEmitter<boolean>();

  @Input()
  loading = false;

  faSpinner = faSpinner;

  load() {
    this.onLoad.emit(true);
  }
}
