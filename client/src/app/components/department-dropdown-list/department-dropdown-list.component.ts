import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Department } from 'src/app/models/Department';
import { Pagination } from 'src/app/models/Pagination';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-department-dropdown-list',
  templateUrl: './department-dropdown-list.component.html',
  styleUrls: ['./department-dropdown-list.component.css'],
})
export class DepartmentDropdownListComponent implements OnInit {
  loading = false;
  pager: Pagination<Department> = {
    page: 1,
    results: [],
    totalPages: 0,
  };
  searchTerm = '';
  firstTimeLoadComplete = false;

  @Output()
  onSelect = new EventEmitter<Department>();

  @Input()
  selectedId?: number;

  selected?: Department;

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
          if (!this.firstTimeLoadComplete) {
            const index = this.selectedId
              ? response.results.findIndex((d) => d.id === this.selectedId)
              : 0;
            this.select(response.results[index]);
          }
          this.firstTimeLoadComplete = true;
        },
        error: (err) => {
          this.loading = false;
          this.toastr.warning(err.error.error || err.statusText);
        },
      });
  }

  select(data: Department) {
    this.selected = data;
    this.onSelect.emit(data);
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
