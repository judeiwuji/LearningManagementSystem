import { Classroom } from './ClassRoom';
import { Lecturer } from './Lecturer';

export interface Quiz {
  id: number;
  classRoomId: number;
  classroom: Classroom;
  lecturerId: number;
  lecturer: Lecturer;
  title: string;
  duration: number;
  status: number;
  processing?: boolean;
}

export interface QuizActionRequest {
  classRoomId?: number;
  title?: string;
  duration?: number;
  status?: number;
}
