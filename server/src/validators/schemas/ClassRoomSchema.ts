import { number, object, string } from 'yup';

export const ClassRoomCreationSchema = object({
  title: string().required(),
});

export const ClassRoomUpdateSchema = object({
  title: string().optional(),
});
