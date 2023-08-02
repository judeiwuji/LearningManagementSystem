import { Lecturer } from './Lecturer';
import { Student } from './Student';
import { Roles } from './enums/Roles';

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  avatar: string;
  role: Roles;
  password?: string;
  lecturer?: Lecturer;
  student?: Student;
}

export interface UserActionRequest {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
}
