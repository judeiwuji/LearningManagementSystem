import { number, object, string } from 'yup';

export const QuestionAnswerCreationSchema = object({
  answer: string().required(),
});
