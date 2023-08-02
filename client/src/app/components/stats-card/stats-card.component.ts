import { Component, Input } from '@angular/core';
import { AppStats } from 'src/app/models/AppStats';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.css'],
})
export class StatsCardComponent {
  @Input()
  data!: AppStats;
}
