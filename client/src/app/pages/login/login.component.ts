import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { LoginRequest } from 'src/app/models/Auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  faSpinner = faSpinner;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  processing = false;

  constructor(
    private readonly router: Router,
    private readonly toastr: ToastrService,
    private readonly authService: AuthService
  ) {}

  get fc() {
    return this.loginForm.controls;
  }

  login() {
    if (this.processing) return;
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      this.processing = true;
      const request: LoginRequest = {
        email: this.fc['email'].value as string,
        password: this.fc['password'].value as string,
      };

      const sub = this.authService.login(request).subscribe({
        next: (response) => {
          console.log(response);
          sub.unsubscribe();
          this.processing = false;
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.processing = false;
          this.toastr.clear();
          this.toastr.warning(err.error.error);
        },
      });
    }
  }
}
