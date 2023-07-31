import { number, object, string } from 'yup';

export const LecturerCreationSchema = object({
  email: string().required(),
  password: string().required(),
  firstname: string().required(),
  lastname: string().required(),
  departmentId: number().positive().integer().required(),
});

export const LecturerUpdateSchema = object({
  firstname: string().optional(),
  lastname: string().optional(),
  departmentId: number().positive().integer().optional(),
});
