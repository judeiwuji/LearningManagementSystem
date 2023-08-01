import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faPlus, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DepartmentFormComponent } from 'src/app/modals/department-form/department-form.component';
import { Department } from 'src/app/models/Department';
import { Pagination } from 'src/app/models/Pagination';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css'],
})
export class DepartmentsComponent implements OnInit {
  loading = false;
  pager: Pagination<Department> = {
    page: 1,
    results: [],
    totalPages: 0,
  };
  searchTerm = '';

  constructor(
    private readonly toastr: ToastrService,
    private readonly modal: NgbModal,
    private readonly departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(page = 1) {
    if (this.loading) return;

    this.loading = true;
    const sub = this.departmentService
      .getDepartents(page, this.searchTerm)
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
    const instance = this.modal.open(DepartmentFormComponent, {
      size: 'sm',
      backdrop: 'static',
    });

    instance.componentInstance.data = null;

    instance.result.then((data) => {
      if (data) {
        this.pager.results.unshift(data);
      }
    });
  }

  onEdit(data: Department) {
    const instance = this.modal.open(DepartmentFormComponent, {
      size: 'sm',
      backdrop: 'static',
    });

    instance.componentInstance.data = data;
  }

  onDelete(data: Department) {
    if (data.processing) return;

    data.processing = true;
    const sub = this.departmentService.deleteDepartent(data.id).subscribe({
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
