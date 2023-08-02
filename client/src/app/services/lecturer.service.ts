import { Injectable } from '@angular/core';
import { Lecturer, LecturerActionRequest } from '../models/Lecturer';
import { Pagination } from '../models/Pagination';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LecturerService {
  private API_URL = `${environment.apiURL}`;
  constructor(private http: HttpClient) {}

  createLecturer(request: LecturerActionRequest) {
    return this.http.post(`${this.API_URL}/lecturers`, request, {
      withCredentials: true,
    });
  }

  getLecturers(page = 1, search = '') {
    return this.http.get<Pagination<Lecturer>>(
      `${this.API_URL}/lecturers?page=${page}&search=${search}`,
      { withCredentials: true }
    );
  }

  updateLecturer(request: LecturerActionRequest, id: number) {
    return this.http.put<Lecturer>(`${this.API_URL}/lecturers/${id}`, request, {
      withCredentials: true,
    });
  }

  deleteLecturer(id: number) {
    return this.http.delete<void>(`${this.API_URL}/lecturers/${id}`, {
      withCredentials: true,
    });
  }
}
