import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { StudentFormComponent } from 'src/app/modals/student-form/student-form.component';
import { Pagination } from 'src/app/models/Pagination';
import { Student } from 'src/app/models/Student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent {
  loading = false;
  pager: Pagination<Student> = {
    page: 1,
    results: [],
    totalPages: 0,
  };
  searchTerm = '';

  constructor(
    private readonly toastr: ToastrService,
    private readonly modal: NgbModal,
    private readonly studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(page = 1) {
    if (this.loading) return;

    this.loading = true;
    const sub = this.studentService
      .getStudents(page, this.searchTerm)
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

  onAdd() {
    const instance = this.modal.open(StudentFormComponent, {
      size: 'lg',
      backdrop: 'static',
    });

    instance.componentInstance.data = null;

    instance.result.then((data) => {
      if (data) {
        this.pager.results.unshift(data);
      }
    });
  }

  onEdit(data: Student) {
    const instance = this.modal.open(StudentFormComponent, {
      size: 'lg',
      backdrop: 'static',
    });

    instance.componentInstance.data = data;
  }

  onDelete(data: Student) {
    if (data.processing) return;

    data.processing = true;
    const sub = this.studentService.deleteStudent(data.id).subscribe({
      next: () => {
        sub.unsubscribe();
        data.processing = false;
        const index = this.pager.results.findIndex((d) => d.id === data.id);
        if (index !== -1) {
          this.pager.results.splice(index, 1);
        }
      },
      error: (err) => {
        data.processing = false;
        this.toastr.clear();
        this.toastr.warning(err.error.error || err.statusText);
      },
    });
  }
}
