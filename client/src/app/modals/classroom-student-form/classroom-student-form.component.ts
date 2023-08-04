import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import {
  ClassroomStudent,
  ClassroomStudentActionRequest,
} from 'src/app/models/ClassroomStudent';
import { Pagination } from 'src/app/models/Pagination';
import { Student } from 'src/app/models/Student';
import { ClassroomStudentService } from 'src/app/services/classroom-student.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-classroom-student-form',
  templateUrl: './classroom-student-form.component.html',
  styleUrls: ['./classroom-student-form.component.css'],
})
export class ClassroomStudentFormComponent {
  loading = false;
  pager: Pagination<Student> = {
    page: 1,
    results: [],
    totalPages: 0,
  };
  searchTerm = '';

  @Input()
  classRoomId!: number;
  shouldRefresh = false;

  students: ClassroomStudent[] = [];

  constructor(
    private readonly toastr: ToastrService,
    private readonly activeModal: NgbActiveModal,
    private readonly studentService: StudentService,
    private readonly classroomStudentService: ClassroomStudentService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(page = 1) {
    if (this.loading) return;

    this.loading = true;
    const sub = this.studentService
      .getStudents(page, this.searchTerm, this.classRoomId)
      .subscribe({
        next: (response) => {
          sub.unsubscribe();
          this.loading = false;
          this.pager.page = page;
          this.pager.results.push(...response.results);
          this.pager.totalPages = response.totalPages;
        },
        error: (err) => {
          this.loading = false;
          this.toastr.warning(err.error.error || err.statusText);
        },
      });
  }

  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.pager = {
      page: 1,
      results: [],
      totalPages: 0,
    };
    this.loadData();
  }

  close() {
    this.activeModal.close(this.shouldRefresh);
  }

  addStudent(data: Student) {
    if (data.processing) return;

    data.processing = true;
    const request: ClassroomStudentActionRequest = {
      classRoomId: this.classRoomId,
      studentId: data.id,
    };

    this.classroomStudentService
      .addStudent(this.classRoomId, request)
      .subscribe({
        next: (response) => {
          this.toastr.clear();
          data.processing = false;
          data.isStudent = true;
          this.shouldRefresh = true;
        },
        error: (err) => {
          data.processing = false;
          this.toastr.clear();
          this.toastr.warning(err.error.error || err.statusText);
        },
      });
  }

  removeStudent(data: Student) {
    if (data.processing) return;

    data.processing = true;
    const sub = this.classroomStudentService
      .removeStudent(this.classRoomId, data.id)
      .subscribe({
        next: () => {
          sub.unsubscribe();
          data.processing = false;
          data.isStudent = false;
          this.shouldRefresh = true;
        },
        error: (err) => {
          data.processing = false;
          this.toastr.clear();
          this.toastr.warning(err.error.error || err.statusText);
        },
      });
  }
}
