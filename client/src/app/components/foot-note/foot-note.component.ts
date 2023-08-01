import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-foot-note',
  templateUrl: './foot-note.component.html',
  styleUrls: ['./foot-note.component.css'],
})
export class FootNoteComponent {
  @Input()
  currentPage = 1;

  @Input()
  totalPages = 0;
}
