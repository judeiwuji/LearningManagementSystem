import { Lecturer } from './Lecturer';
import { Quiz } from './Quiz';
import { ClassRoomStatus } from './enums/ClassroomStatus';

export interface Classroom {
  id: number;
  lecturerId: number;
  lecturer: Lecturer;
  title: string;
  updatedAt: string;
  processing?: boolean;
  status?: ClassRoomStatus;
  quizzes: Quiz[];
}

export interface ClassroomActionRequest {
  title?: string;
  status?: ClassRoomStatus;
}

export interface StudentClassroom {
  classRoom: Classroom;
  processing?: boolean;
}
