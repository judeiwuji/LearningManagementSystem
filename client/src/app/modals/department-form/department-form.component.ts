import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Department, DepartmentActionRequest } from 'src/app/models/Department';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css'],
})
export class DepartmentFormComponent implements OnInit {
  @Input()
  data?: Department;
  dataForm!: FormGroup;
  processing = false;

  constructor(
    private readonly activeModal: NgbActiveModal,
    private readonly toastr: ToastrService,
    private readonly departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.dataForm = new FormGroup({
      name: new FormControl(this.data?.name, [Validators.required]),
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
    if (this.dataForm.invalid) return;

    const request: DepartmentActionRequest = {
      name: this.fc['name'].value as string,
    };
    if (this.data) {
      this.update(request);
    } else {
      this.create(request);
    }
  }

  update(request: DepartmentActionRequest) {
    if (this.processing) return;

    if (this.data) {
      this.processing = true;
      const sub = this.departmentService
        .updateDepartent(request, this.data?.id as number)
        .subscribe({
          next: (response) => {
            sub.unsubscribe();
            this.data && (this.data.name = response.name);
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

  create(request: DepartmentActionRequest) {
    if (this.processing) return;

    this.processing = true;
    const sub = this.departmentService.createDepartment(request).subscribe({
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
}
