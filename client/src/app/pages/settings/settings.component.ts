import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Department } from 'src/app/models/Department';
import { LecturerActionRequest } from 'src/app/models/Lecturer';
import { Level } from 'src/app/models/Level';
import { StudentActionRequest } from 'src/app/models/Student';
import { User, UserActionRequest } from 'src/app/models/User';
import { Roles } from 'src/app/models/enums/Roles';
import { AuthService } from 'src/app/services/auth.service';
import { LecturerService } from 'src/app/services/lecturer.service';
import { StudentService } from 'src/app/services/student.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  accountForm!: FormGroup;
  loading = true;
  profile?: User;
  processing = false;

  constructor(
    private readonly toastr: ToastrService,
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser().subscribe({
      next: (response) => {
        this.loading = false;
        this.profile = response;
        this.accountForm = new FormGroup({
          firstname: new FormControl(response.firstname, [Validators.required]),
          lastname: new FormControl(response.lastname, [Validators.required]),
        });
        switch (response.role) {
          case Roles.STUDENT:
            this.accountForm?.addControl(
              'departmentId',
              new FormControl(response.student?.department.id)
            );
            this.accountForm?.addControl(
              'levelId',
              new FormControl(response.student?.level.id)
            );
            break;
          case Roles.LECTURER:
            this.accountForm?.addControl(
              'departmentId',
              new FormControl(response.lecturer?.department.id)
            );
            break;
        }
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }

  get fc() {
    return this.accountForm?.controls;
  }

  onSelectDepartment(data: Department) {
    this.fc['departmentId'].setValue(data.id);
  }

  onSelectLevel(data: Level) {
    this.fc['levelId'].setValue(data.id);
  }

  save() {
    if (this.processing) return;

    this.processing = true;
    let request: UserActionRequest = {
      firstname: this.fc['firstname'].value,
      lastname: this.fc['lastname'].value,
    };
    switch (this.profile?.role) {
      case Roles.STUDENT:
        request = {
          ...request,
          departmentId: this.fc['departmentId'].value,
          levelId: this.fc['departmentId'].value,
        } as StudentActionRequest;
        break;
      case Roles.LECTURER:
        request = {
          ...request,
          departmentId: this.fc['departmentId'].value,
        } as LecturerActionRequest;
        break;
    }
    this.updateUser(request);
  }

  updateUser(request: UserActionRequest) {
    this.userService.updateUser(request, this.profile?.id as number).subscribe({
      next: (response) => {
        this.processing = false;
        this.toastr.clear();
        this.toastr.success('Saved');
      },
      error: (err) => {
        this.processing = false;
        this.toastr.clear();
        this.toastr.warning(err.error.error || err.statusText);
      },
    });
  }
}
