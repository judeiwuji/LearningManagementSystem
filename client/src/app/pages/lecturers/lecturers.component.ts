import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LecturerFormComponent } from 'src/app/modals/lecturer-form/lecturer-form.component';
import { Lecturer } from 'src/app/models/Lecturer';
import { Pagination } from 'src/app/models/Pagination';
import { LecturerService } from 'src/app/services/lecturer.service';

@Component({
  selector: 'app-lecturers',
  templateUrl: './lecturers.component.html',
  styleUrls: ['./lecturers.component.css'],
})
export class LecturersComponent implements OnInit {
  loading = false;
  pager: Pagination<Lecturer> = {
    page: 1,
    results: [],
    totalPages: 0,
  };
  searchTerm = '';

  constructor(
    private readonly toastr: ToastrService,
    private readonly modal: NgbModal,
    private readonly lecturerService: LecturerService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(page = 1) {
    if (this.loading) return;

    this.loading = true;
    const sub = this.lecturerService
      .getLecturers(page, this.searchTerm)
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
    const instance = this.modal.open(LecturerFormComponent, {
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

  onEdit(data: Lecturer) {
    const instance = this.modal.open(LecturerFormComponent, {
      size: 'lg',
      backdrop: 'static',
    });

    instance.componentInstance.data = data;
  }

  onDelete(data: Lecturer) {
    if (data.processing) return;

    data.processing = true;
    const sub = this.lecturerService.deleteLecturer(data.id).subscribe({
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
