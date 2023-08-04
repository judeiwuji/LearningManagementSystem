import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Student, StudentActionRequest } from '../models/Student';
import { Pagination } from '../models/Pagination';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private API_URL = `${environment.apiURL}`;
  constructor(private http: HttpClient) {}

  createStudent(request: StudentActionRequest) {
    return this.http.post(`${this.API_URL}/students`, request, {
      withCredentials: true,
    });
  }

  getStudents(page = 1, search = '', classRoomId?: number) {
    return this.http.get<Pagination<Student>>(
      `${this.API_URL}/students?page=${page}&search=${search}&cid=${classRoomId}`,
      { withCredentials: true }
    );
  }

  updateStudent(request: StudentActionRequest, id: number) {
    return this.http.put<Student>(`${this.API_URL}/students/${id}`, request, {
      withCredentials: true,
    });
  }

  deleteStudent(id: number) {
    return this.http.delete<void>(`${this.API_URL}/students/${id}`, {
      withCredentials: true,
    });
  }
}
