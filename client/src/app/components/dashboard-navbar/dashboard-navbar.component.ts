import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import {
  faDashboard,
  faShoppingCart,
  faUserAlt,
  faCog,
  faBell,
  faPowerOff,
  faBars,
  faTasks,
  faTimes,
  faUsers,
  faChalkboardTeacher,
  faWifi,
  faListAlt,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './dashboard-navbar.component.html',
  styleUrls: ['./dashboard-navbar.component.css'],
})
export class DashboardNavbarComponent {
  @Input()
  title!: string;

  faDashboard = faDashboard;
  faShoppingCart = faShoppingCart;
  faUserAlt = faUserAlt;
  faCog = faCog;
  faBell = faBell;
  faPowerOff = faPowerOff;
  faBars = faBars;
  faTasks = faTasks;
  faWifi = faWifi;
  faTimes = faTimes;
  faUsers = faUsers;
  faChalkboardTeacher = faChalkboardTeacher;
  faListAlt = faListAlt;
  isSidebarOpen = false;
  activeUrl: string;
  profile?: User;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly toastr: ToastrService,
    private readonly userService: UserService
  ) {
    this.activeUrl = this.router.url;
  }

  ngOnInit(): void {
    this.authService.currentUser().subscribe((user) => {
      this.profile = user;
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout() {
    this.toastr.info('Please wait', '', { timeOut: 0 });

    this.authService.logout().subscribe({
      next: () => {
        this.toastr.clear();
        // this.authService.clearSession();
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        this.toastr.clear();
        this.toastr.warning(err.error.error);
      },
    });
  }
}
