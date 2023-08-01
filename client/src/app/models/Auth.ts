export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  role: string;
}

export interface LogoutResponse {
  status: string;
}
