import { Department } from './Department';
import { Level } from './Level';
import { User, UserActionRequest } from './User';

export interface Student {
  id: number;
  userId: number;
  user: User;
  departmentId: number;
  department: Department;
  levelId: number;
  level: Level;
}

export interface StudentActionRequest extends UserActionRequest {
  departmentId: number;
  levelId: number;
}
