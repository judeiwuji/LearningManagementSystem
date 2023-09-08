import { Classroom } from './ClassRoom';
import { Student } from './Student';

export interface ClassroomStudent {
  id: number;
  classRoomId: number;
  studentId: number;
  student: Student;
  classRoom: Classroom;
  processing?: boolean;
}

export interface ClassroomStudentActionRequest {
  classRoomId: number;
  studentId: number;
}
