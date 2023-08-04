import { Component } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.css'],
})
export class MainNavbarComponent {
  isLoggedIn = false;
  profile!: User;

  constructor(private readonly authService: AuthService) {
    this.isLoggedIn = authService.isLoggedIn();

    if (this.isLoggedIn) {
      this.authService
        .currentUser()
        .subscribe({ next: (response) => (this.profile = response) });
    }
  }
}
