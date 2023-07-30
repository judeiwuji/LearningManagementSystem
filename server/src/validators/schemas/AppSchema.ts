import { object, string } from 'yup';

export const AppInstallSchema = object({
  email: string().email().required(),
  password: string().required(),
  firstname: string().required(),
  lastname: string().required(),
});
