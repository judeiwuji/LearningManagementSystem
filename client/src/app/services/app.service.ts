import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppStats } from '../models/AppStats';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private API_URL = `${environment.apiURL}`;
  constructor(private http: HttpClient) {}

  getStatus() {
    return this.http.get(`${this.API_URL}/status`);
  }

  getStats() {
    return this.http.get<AppStats>(`${this.API_URL}/stats`);
  }

  getLevels() {
    return this.http.get(`${this.API_URL}/levels`);
  }
}
