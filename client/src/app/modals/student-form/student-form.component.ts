import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Department } from 'src/app/models/Department';
import { Level } from 'src/app/models/Level';
import { Student, StudentActionRequest } from 'src/app/models/Student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
})
export class StudentFormComponent {
  @Input()
  data?: Student;
  dataForm!: FormGroup;
  processing = false;
  constructor(
    private readonly activeModal: NgbActiveModal,
    private readonly toastr: ToastrService,
    private readonly studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.dataForm = new FormGroup({
      firstname: new FormControl(this.data?.user.firstname, [
        Validators.required,
      ]),
      lastname: new FormControl(this.data?.user.lastname, [
        Validators.required,
      ]),
      departmentId: new FormControl(this.data?.department.id, [
        Validators.required,
      ]),
      levelId: new FormControl(this.data?.level.id, [Validators.required]),
      email: new FormControl(
        this.data?.user.email,
        this.data?.user.email ? [Validators.required] : []
      ),
      password: new FormControl(
        this.data?.user.password,
        this.data?.user.password ? [Validators.required] : []
      ),
    });
  }

  close() {
    this.activeModal.close();
  }

  get fc() {
    return this.dataForm.controls;
  }

  save() {
    this.dataForm.markAllAsTouched();
    if (this.dataForm.invalid) {
      this.toastr.warning('Some fields are empty');
      return;
    }

    const request: StudentActionRequest = {
      firstname: this.fc['firstname'].value as string,
      lastname: this.fc['lastname'].value as string,
      departmentId: Number(this.fc['departmentId'].value),
      levelId: Number(this.fc['levelId'].value),
      email: this.fc['email'].value,
      password: this.fc['password'].value,
    };

    if (this.data) {
      this.update(request);
    } else {
      this.create(request);
    }
  }

  update(request: StudentActionRequest) {
    if (this.processing) return;

    if (this.data) {
      this.processing = true;
      const sub = this.studentService
        .updateStudent(request, this.data?.id as number)
        .subscribe({
          next: (response) => {
            sub.unsubscribe();
            if (this.data) {
              this.data.user = response.user;
              this.data.department = response.department;
              this.data.departmentId = response.departmentId;
              this.data.level = response.level;
              this.data.levelId = response.levelId;
            }
            this.processing = false;
            this.close();
          },
          error: (err) => {
            this.toastr.clear();
            this.toastr.warning(err.error.error || err.statusText);
            this.processing = false;
          },
        });
    }
  }

  create(request: StudentActionRequest) {
    if (this.processing) return;

    this.processing = true;
    const sub = this.studentService.createStudent(request).subscribe({
      next: (response) => {
        sub.unsubscribe();
        this.activeModal.close(response);
      },
      error: (err) => {
        this.processing = false;
        this.toastr.clear();
        this.toastr.warning(err.error.error || err.statusText);
      },
    });
  }

  onSelectDepartment(data: Department) {
    this.fc['departmentId'].setValue(data.id);
  }

  onSelectLevel(data: Level) {
    this.fc['levelId'].setValue(data.id);
  }
}
