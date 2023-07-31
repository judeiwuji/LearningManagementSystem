import { number, object, string } from 'yup';

export const StudentCreationSchema = object({
  email: string().required(),
  password: string().required(),
  firstname: string().required(),
  lastname: string().required(),
  departmentId: number().positive().integer(),
  levelId: number().positive().integer(),
});

export const StudentUpdateSchema = object({
  firstname: string().optional(),
  lastname: string().optional(),
  departmentId: number().positive().integer().optional(),
  levelId: number().positive().integer().optional(),
});
