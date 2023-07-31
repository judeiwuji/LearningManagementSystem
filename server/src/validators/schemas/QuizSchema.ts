import { object, string } from 'yup';

export const QuizCreationSchema = object({
  title: string().required(),
});

export const QuizUpdateSchema = object({
  title: string().optional(),
});
