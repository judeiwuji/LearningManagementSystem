import { Lecturer } from './Lecturer';
import { ClassRoomStatus } from './enums/ClassroomStatus';

export interface Classroom {
  id: number;
  lecturerId: number;
  lecturer: Lecturer;
  title: string;
  updatedAt: string;
  processing?: boolean;
  status?: ClassRoomStatus;
}

export interface ClassroomActionRequest {
  title?: string;
  status?: ClassRoomStatus;
}

export interface StudentClassroom {
  classRoom: Classroom;
  processing?: boolean;
}
