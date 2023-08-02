import { Component } from '@angular/core';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ClassroomFormComponent } from 'src/app/modals/classroom-form/classroom-form.component';
import { Classroom } from 'src/app/models/ClassRoom';
import { Pagination } from 'src/app/models/Pagination';
import { ClassroomService } from 'src/app/services/classroom.service';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.css'],
})
export class ClassroomsComponent {
  loading = false;
  pager: Pagination<Classroom> = {
    page: 1,
    results: [],
    totalPages: 0,
  };
  searchTerm = '';
  faExternalLinkAlt = faExternalLinkAlt;

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
      .getClassrooms(page, this.searchTerm)
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
    const instance = this.modal.open(ClassroomFormComponent, {
      size: 'md',
      backdrop: 'static',
    });

    instance.componentInstance.data = null;

    instance.result.then((data) => {
      if (data) {
        this.pager.results.unshift(data);
      }
    });
  }

  onEdit(data: Classroom) {
    const instance = this.modal.open(ClassroomFormComponent, {
      size: 'md',
      backdrop: 'static',
    });

    instance.componentInstance.data = data;
  }

  onDelete(data: Classroom) {
    if (data.processing) return;

    data.processing = true;
    const sub = this.classroomService.deleteClassroom(data.id).subscribe({
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
