import { Component, Input } from '@angular/core';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent {
  @Input()
  title?: string;

  @Input()
  backLink?: string;

  faArrowLeftLong = faArrowLeftLong;
}
