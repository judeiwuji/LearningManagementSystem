import { Injectable } from '@angular/core';
import { Classroom, ClassroomActionRequest, StudentClassroom } from '../models/ClassRoom';
import { Pagination } from '../models/Pagination';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClassroomService {
  private API_URL = `${environment.apiURL}`;

  constructor(private http: HttpClient) {}

  createDepartment(request: ClassroomActionRequest) {
    return this.http.post(`${this.API_URL}/classrooms`, request, {
      withCredentials: true,
    });
  }

  getClassrooms(page = 1, search = '') {
    return this.http.get<Pagination<Classroom>>(
      `${this.API_URL}/classrooms?page=${page}&search=${search}`,
      { withCredentials: true }
    );
  }

  getClassroom(id: number) {
    return this.http.get<Classroom>(`${this.API_URL}/classrooms/${id}`, {
      withCredentials: true,
    });
  }

  updateClassroom(request: ClassroomActionRequest, id: number) {
    return this.http.put<Classroom>(
      `${this.API_URL}/classrooms/${id}`,
      request,
      {
        withCredentials: true,
      }
    );
  }

  deleteClassroom(id: number) {
    return this.http.delete<void>(`${this.API_URL}/classrooms/${id}`, {
      withCredentials: true,
    });
  }

  getStudentClassrooms(page = 1, search = '', filters: any = {}) {
    return this.http.get<Pagination<StudentClassroom>>(
      `${
        this.API_URL
      }/students/classrooms?page=${page}&search=${search}&filters=${JSON.stringify(
        filters
      )}`,
      { withCredentials: true }
    );
  }
}
