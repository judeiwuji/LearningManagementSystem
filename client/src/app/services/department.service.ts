import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Department, DepartmentActionRequest } from '../models/Department';
import { Pagination } from '../models/Pagination';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private API_URL = `${environment.apiURL}`;

  constructor(private http: HttpClient) {}

  createDepartment(request: DepartmentActionRequest) {
    return this.http.post(`${this.API_URL}/departments`, request, {
      withCredentials: true,
    });
  }

  getDepartents(page = 1, search = '') {
    return this.http.get<Pagination<Department>>(
      `${this.API_URL}/departments?page=${page}&search=${search}`,
      { withCredentials: true }
    );
  }

  updateDepartent(request: DepartmentActionRequest, id: number) {
    return this.http.put<Department>(
      `${this.API_URL}/departments/${id}`,
      request,
      {
        withCredentials: true,
      }
    );
  }

  deleteDepartent(id: number) {
    return this.http.delete<void>(`${this.API_URL}/departments/${id}`, {
      withCredentials: true,
    });
  }
}
