import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { ResetPasswordRequest } from 'src/app/models/ResetPassword';
import { User } from 'src/app/models/User';
import { ResetPasswordViews } from 'src/app/models/enums/ResetPasswordViews';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.css'],
})
export class ForgottenPasswordComponent implements OnInit {
  isMainView = false;
  isResetView = false;
  processing = false;
  accountForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
  });
  passwordForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });
  faArrowLeftLong = faArrowLeftLong;
  profile!: User;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.setView(ResetPasswordViews.Main);
  }

  setView(mode: ResetPasswordViews) {
    this.isMainView = mode === ResetPasswordViews.Main;
    this.isResetView = mode === ResetPasswordViews.Reset;
  }

  identifyUser() {
    if (this.processing) return;

    this.processing = true;
    this.userService
      .identifyUser(this.accountForm.controls['email'].value as string)
      .subscribe({
        next: (response) => {
          this.processing = false;
          this.profile = response;
          this.setView(ResetPasswordViews.Reset);
        },
        error: (err) => {
          this.processing = false;
          this.toastr.warning(err.error.error || err.statusText);
        },
      });
  }

  resetPassword() {
    if (this.processing) return;

    this.processing = true;
    const request: ResetPasswordRequest = {
      confirmPassword: this.passwordForm.controls['confirmPassword']
        .value as string,
      password: this.passwordForm.controls['password'].value as string,
      userId: this.profile.id,
    };
    this.userService.resetPassword(request).subscribe({
      next: (response) => {
        this.toastr.success('Success');
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        this.processing = false;
        this.toastr.warning(err.error.error || err.statusText);
      },
    });
  }
}
