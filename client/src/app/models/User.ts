export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  avatar: string;
  password?: string;
}

export interface UserActionRequest {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
}
