import { Component } from '@angular/core';
import {
  faChalkboard,
  faTasks,
  faClock,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  faChalkboard = faChalkboard;
  faTasks = faTasks;
  faClock = faClock;
}
