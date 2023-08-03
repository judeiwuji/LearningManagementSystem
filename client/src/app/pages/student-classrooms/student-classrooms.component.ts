import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { StudentClassroom } from 'src/app/models/ClassRoom';
import { Pagination } from 'src/app/models/Pagination';
import { ClassroomService } from 'src/app/services/classroom.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-classrooms',
  templateUrl: './student-classrooms.component.html',
  styleUrls: ['./student-classrooms.component.css'],
})
export class StudentClassroomsComponent {
  loading = false;
  pager: Pagination<StudentClassroom> = {
    page: 1,
    results: [],
    totalPages: 0,
  };
  searchTerm = '';

  constructor(
    private readonly toastr: ToastrService,
    private readonly modal: NgbModal,
    private readonly classroomService: ClassroomService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(page = 1) {
    if (this.loading) return;

    this.loading = true;
    const sub = this.classroomService
      .getStudentClassrooms(page, this.searchTerm)
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
}
