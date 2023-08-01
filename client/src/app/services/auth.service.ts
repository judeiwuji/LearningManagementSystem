import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginRequest, LoginResponse, LogoutResponse } from '../models/Auth';
import { User } from '../models/User';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = `${environment.apiURL}`;
  constructor(
    private http: HttpClient,
    private readonly cookieService: CookieService
  ) {}

  login(request: LoginRequest) {
    return this.http.post<LoginResponse>(
      `${this.API_URL}/auth/login`,
      request,
      { withCredentials: true }
    );
  }

  logout() {
    return this.http.post<LogoutResponse>(
      `${this.API_URL}/auth/logout`,
      {},
      { withCredentials: true }
    );
  }

  currentUser() {
    return this.http.get<User>(`${this.API_URL}/auth/currentuser`, {
      withCredentials: true,
    });
  }

  isLoggedIn() {
    return this.cookieService.check('session');
  }
}
