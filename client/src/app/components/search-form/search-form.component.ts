import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent {
  @Output()
  onSearch = new EventEmitter<string>();

  faSearch = faSearch;
  searchForm = new FormGroup({
    term: new FormControl(''),
  });

  get fc() {
    return this.searchForm.controls;
  }

  search() {
    const term = this.fc['term'].value as string;

    this.onSearch.emit(term);
  }
}
