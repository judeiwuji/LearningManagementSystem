import { mixed, number, object, string } from 'yup';
import { ClassRoomStatus } from '../../models/enums/ClassRoomStatus';

export const ClassRoomCreationSchema = object({
  title: string().required(),
});

export const ClassRoomUpdateSchema = object({
  title: string().optional(),
  status: mixed().oneOf(Object.values(ClassRoomStatus)),
});

export const ClassRoomStudentSchema = object({
  studentId: number().positive().integer().required(),
});
