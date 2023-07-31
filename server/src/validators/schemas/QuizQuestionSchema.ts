import { array, object, string } from 'yup';

export const QuizQuestionCreationSchema = object({
  question: string().required(),
  answer: string().required(),
  options: array().of(string()),
});

export const QuizQuestionUpdateSchema = object({
  question: string().optional(),
  answer: string().optional(),
});
