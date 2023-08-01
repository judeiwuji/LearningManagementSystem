import { Department } from './Department';
import { User, UserActionRequest } from './User';

export interface Lecturer {
  id: number;
  userId: number;
  user: User;
  departmentId: number;
  department: Department;
}

export interface LecturerActionRequest extends UserActionRequest {
  departmentId: number;
}
