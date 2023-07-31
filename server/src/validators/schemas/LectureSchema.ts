import { number, object, string } from 'yup';

export const LectureCreationSchema = object({
  startDate: string().required(),
  endDate: string().required(),
  title: string().required(),
});

export const LectureUpdateSchema = object({
  startDate: string().optional(),
  endDate: string().optional(),
  title: string().optional(),
});
