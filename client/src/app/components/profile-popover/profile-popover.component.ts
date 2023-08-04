import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-popover',
  templateUrl: './profile-popover.component.html',
  styleUrls: ['./profile-popover.component.css'],
})
export class ProfilePopoverComponent {
  @Input()
  profile!: User;

  faPowerOff = faPowerOff;
  constructor(
    private readonly toastr: ToastrService,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  logout() {
    this.toastr.info('Please wait', '', { timeOut: 0 });

    this.authService.logout().subscribe({
      next: () => {
        this.toastr.clear();
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        this.toastr.clear();
        this.toastr.warning(err.error.error);
      },
    });
  }
}
