import { Component, OnInit } from '@angular/core';
import { AppStats } from 'src/app/models/AppStats';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  stats: AppStats[] = [];
  constructor(private readonly appService: AppService) {}

  ngOnInit(): void {
    this.getStats();
  }

  getStats() {
    this.appService.getStats().subscribe({
      next: (response) => {
        this.stats = response;
      },
      error: (err) => {},
    });
  }
}
