import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Classroom, ClassroomActionRequest } from 'src/app/models/ClassRoom';
import { ClassroomService } from 'src/app/services/classroom.service';

@Component({
  selector: 'app-classroom-form',
  templateUrl: './classroom-form.component.html',
  styleUrls: ['./classroom-form.component.css'],
})
export class ClassroomFormComponent {
  @Input()
  data?: Classroom;
  dataForm!: FormGroup;
  processing = false;

  constructor(
    private readonly activeModal: NgbActiveModal,
    private readonly toastr: ToastrService,
    private readonly classroomService: ClassroomService
  ) {}

  ngOnInit(): void {
    this.dataForm = new FormGroup({
      title: new FormControl(this.data?.title, [Validators.required]),
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

    const request: ClassroomActionRequest = {
      title: this.fc['title'].value as string,
    };
    if (this.data) {
      this.update(request);
    } else {
      this.create(request);
    }
  }

  update(request: ClassroomActionRequest) {
    if (this.processing) return;

    if (this.data) {
      this.processing = true;
      const sub = this.classroomService
        .updateClassroom(request, this.data?.id as number)
        .subscribe({
          next: (response) => {
            sub.unsubscribe();
            this.data && (this.data.title = response.title);
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

  create(request: ClassroomActionRequest) {
    if (this.processing) return;

    this.processing = true;
    const sub = this.classroomService.createDepartment(request).subscribe({
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
