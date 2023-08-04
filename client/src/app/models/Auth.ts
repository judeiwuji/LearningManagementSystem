import { Roles } from './enums/Roles';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  role: Roles;
}

export interface LogoutResponse {
  status: string;
}
