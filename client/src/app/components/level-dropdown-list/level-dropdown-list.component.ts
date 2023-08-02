import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Level } from 'src/app/models/Level';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-level-dropdown-list',
  templateUrl: './level-dropdown-list.component.html',
  styleUrls: ['./level-dropdown-list.component.css'],
})
export class LevelDropdownListComponent implements OnInit {
  loading = false;
  levels: Level[] = [];

  @Output()
  onSelect = new EventEmitter<Level>();

  @Input()
  selectedId?: number;

  selected?: Level;

  constructor(
    private readonly toastr: ToastrService,
    private readonly appService: AppService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    if (this.loading) return;

    this.loading = true;
    const sub = this.appService.getLevels().subscribe({
      next: (response) => {
        sub.unsubscribe();
        this.loading = false;
        this.levels = response;
        const index = this.selectedId
          ? response.findIndex((d) => d.id === this.selectedId)
          : 0;
        this.select(response[index]);
      },
      error: (err) => {
        this.loading = false;
        this.toastr.warning(err.error.error || err.statusText);
      },
    });
  }

  select(data: Level) {
    this.selected = data;
    this.onSelect.emit(data);
  }
}
