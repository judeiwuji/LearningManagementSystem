import { Router } from 'express';
import ensureAuth from '../middleware/ensureAuth';
import QuizQuestionController from '../controllers/QuizQuestionController';

const QuizQuestionRoutes = Router();
QuizQuestionRoutes.get(
  '/quizzes/:qid/questions/all',
  ensureAuth,
  QuizQuestionController.getQuizQuestions
);
QuizQuestionRoutes.get(
  '/quizzes/:qid/questions/:id',
  ensureAuth,
  QuizQuestionController.getQuestion
);
QuizQuestionRoutes.get(
  '/quizzes/:qid/questions',
  ensureAuth,
  QuizQuestionController.getQuestions
);
QuizQuestionRoutes.post(
  '/quizzes/:qid/questions',
  ensureAuth,
  QuizQuestionController.createQuestion
);
QuizQuestionRoutes.put(
  '/quizzes/:qid/questions/:id',
  ensureAuth,
  QuizQuestionController.updateQuestion
);
QuizQuestionRoutes.delete(
  '/quizzes/:qid/questions/:id',
  ensureAuth,
  QuizQuestionController.deleteQuestion
);
export default QuizQuestionRoutes;
