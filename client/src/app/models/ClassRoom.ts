import { Lecturer } from './Lecturer';

export interface Classroom {
  id: number;
  lecturerId: number;
  lecturer: Lecturer;
  title: string;
  updatedAt: string;
  processing?: boolean;
}

export interface ClassroomActionRequest {
  title: string;
}

export interface StudentClassroom {
  classRoom: Classroom;
  processing?: boolean;
}
