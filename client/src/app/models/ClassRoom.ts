import { Lecturer } from './Lecturer';

export interface ClassRoom {
  id: number;
  lecturerId: number;
  lecturer: Lecturer;
  title: string;
}

export interface ClassRoomActionRequest {
  title: string;
}
