import { Classroom } from './ClassRoom';
import { ClassroomStudent } from './ClassroomStudent';
import { Lecturer } from './Lecturer';

export interface Quiz {
  id: number;
  classRoomId: number;
  classRoom: Classroom;
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

export interface StudentQuiz {
  id: number;
  classRoomId: number;
  classRoomStudent: ClassroomStudent;
  lecturerId: number;
  lecturer: Lecturer;
  title: string;
  duration: number;
  status: number;
  processing?: boolean;
}
