import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ClassroomStudentFormComponent } from 'src/app/modals/classroom-student-form/classroom-student-form.component';
import { Classroom } from 'src/app/models/ClassRoom';
import { ClassroomStudent } from 'src/app/models/ClassroomStudent';
import { Pagination } from 'src/app/models/Pagination';
import { ClassroomStudentService } from 'src/app/services/classroom-student.service';
import { ClassroomService } from 'src/app/services/classroom.service';

@Component({
  selector: 'app-classroom-detail',
  templateUrl: './classroom-detail.component.html',
  styleUrls: ['./classroom-detail.component.css'],
})
export class ClassroomDetailComponent {
  loading = false;
  pager: Pagination<ClassroomStudent> = {
    page: 1,
    results: [],
    totalPages: 0,
  };
  searchTerm = '';
  classRoomId: number;
  classRoom?: Classroom;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly toastr: ToastrService,
    private readonly modal: NgbModal,
    private readonly classroomStudentService: ClassroomStudentService,
    private readonly classroomService: ClassroomService
  ) {
    this.classRoomId = Number(this.activatedRoute.snapshot.params['id']);
    this.classroomService.getClassroom(this.classRoomId).subscribe({
      next: (response) => {
        this.classRoom = response;
      },
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(page = 1) {
    if (this.loading) return;

    this.loading = true;
    const sub = this.classroomStudentService
      .getStudents(this.classRoomId, page, this.searchTerm)
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
    const instance = this.modal.open(ClassroomStudentFormComponent, {
      size: 'md',
      backdrop: 'static',
    });

    instance.componentInstance.classRoomId = this.classRoomId;

    instance.result.then((data: ClassroomStudent[] | null) => {
      if (data) {
        this.pager.results.unshift(...data);
      }
    });
  }

  onEdit(data: ClassroomStudent) {
    const instance = this.modal.open(ClassroomStudentFormComponent, {
      size: 'md',
      backdrop: 'static',
    });

    instance.componentInstance.data = data;
  }

  onRemove(data: ClassroomStudent) {
    if (data.processing) return;

    data.processing = true;
    const sub = this.classroomStudentService
      .removeStudent(this.classRoomId, data.id)
      .subscribe({
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
