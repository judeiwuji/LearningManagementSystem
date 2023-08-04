import { Component, OnInit } from '@angular/core';
import { AppStats } from 'src/app/models/AppStats';
import { Roles } from 'src/app/models/enums/Roles';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  stats: AppStats[] = [];
  currentUserRole!: Roles;
  Roles = Roles;
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
  ) {
    this.currentUserRole = authService.role;
  }

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
