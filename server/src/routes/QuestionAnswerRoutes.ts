import { Router } from 'express';
import ensureAuth from '../middleware/ensureAuth';
import QuestionAnswerController from '../controllers/QuestionAnswerController';

const QuestionAnswerRoutes = Router();
QuestionAnswerRoutes.post(
  '/quizzes/:qid/questions/:queId/answers',
  ensureAuth,
  QuestionAnswerController.answerQuestion
);

QuestionAnswerRoutes.get(
  '/quizzes/:qid/students/:sid/results',
  ensureAuth,
  QuestionAnswerController.getStudentQuizResult
);
export default QuestionAnswerRoutes;
