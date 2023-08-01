import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { ResetPasswordViews } from 'src/app/models/enums/ResetPasswordViews';

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

  constructor(private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.setView(ResetPasswordViews.Main);
  }

  setView(mode: ResetPasswordViews) {
    this.isMainView = mode === ResetPasswordViews.Main;
    this.isResetView = mode === ResetPasswordViews.Reset;
  }

  identifyUser() {
    this.setView(ResetPasswordViews.Reset);
  }

  resetPassword() {
    this.toastr.success('Success');
  }
}
