import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css'],
})
export class MessageBoxComponent {
  @Input()
  message = 'Are you sure you want to submit this quiz?';

  constructor(private readonly activeModal: NgbActiveModal) {}

  cancel() {
    this.activeModal.dismiss();
  }

  continue() {
    this.activeModal.close(true);
  }
}
