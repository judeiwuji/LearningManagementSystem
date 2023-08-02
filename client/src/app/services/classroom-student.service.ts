import { Injectable } from '@angular/core';
import { Pagination } from '../models/Pagination';
import {
  ClassroomStudent,
  ClassroomStudentActionRequest,
} from '../models/ClassroomStudent';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClassroomStudentService {
  private API_URL = `${environment.apiURL}`;

  constructor(private http: HttpClient) {}

  addStudent(classRoomId: number, request: ClassroomStudentActionRequest) {
    return this.http.post<ClassroomStudent>(
      `${this.API_URL}/classrooms/${classRoomId}/students`,
      request,
      {
        withCredentials: true,
      }
    );
  }

  getStudents(classRoomId: number, page = 1, search = '') {
    return this.http.get<Pagination<ClassroomStudent>>(
      `${this.API_URL}/classrooms/${classRoomId}/students?page=${page}&search=${search}`,
      { withCredentials: true }
    );
  }

  removeStudent(classRoomId: number, id: number) {
    return this.http.delete<void>(
      `${this.API_URL}/classrooms/${classRoomId}/students/${id}`,
      {
        withCredentials: true,
      }
    );
  }
}
