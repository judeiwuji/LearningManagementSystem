import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChangePasswordRequest } from '../models/ChangePassword';
import { ResetPasswordRequest } from '../models/ResetPassword';
import { User } from '../models/User';
import { Feedback } from '../models/Feedback';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = `${environment.apiURL}`;
  constructor(private http: HttpClient) {}

  identifyUser(email: string) {
    return this.http.get<User>(`${this.API_URL}/users/identify?email=${email}`);
  }

  changePassword(request: ChangePasswordRequest) {
    return this.http.post<Feedback>(
      `${this.API_URL}/users/changePassword`,
      request
    );
  }

  resetPassword(request: ResetPasswordRequest) {
    return this.http.post<Feedback>(
      `${this.API_URL}/users/resetPassword`,
      request
    );
  }
}
