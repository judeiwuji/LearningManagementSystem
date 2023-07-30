import { object, string } from 'yup';

export const LoginSchema = object({
  email: string().required(),
  password: string().required(),
});
