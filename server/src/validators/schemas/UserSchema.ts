import { number, object, ref, string } from 'yup';

export const ChangePasswordSchema = object({
  password: string().required(),
  confirmPassword: string().oneOf([ref('password')], 'Password mismatch'),
});

export const ResetPasswordSchema = object({
  password: string().required(),
  confirmPassword: string().oneOf([ref('password')], 'Password mismatch'),
  userId: number().integer().positive().required(),
});

export const UserUpdateSchema = object({
  firstname: string().optional(),
  lastname: string().optional(),
  departmentId: number().integer().positive().optional(),
  levelId: number().integer().positive().optional(),
});
