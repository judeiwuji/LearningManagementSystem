import { array, object, string } from 'yup';

export const QuestionOptionCreationSchema = object({
  option: string().required(),
});

export const QuestionOptionUpdateSchema = object({
  option: string().optional(),
});
