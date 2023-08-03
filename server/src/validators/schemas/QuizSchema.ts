import { mixed, number, object, string } from 'yup';
import { QuizStatus } from '../../models/enums/QuizStatus';

export const QuizCreationSchema = object({
  title: string().required(),
  duration: number().integer().positive().required(),
});

export const QuizUpdateSchema = object({
  title: string().optional(),
  duration: number().integer().positive().optional(),
  status: mixed().oneOf(Object.values(QuizStatus)),
});
