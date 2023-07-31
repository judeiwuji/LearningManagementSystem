import { Router } from 'express';
import ensureAuth from '../middleware/ensureAuth';
import QuizController from '../controllers/QuizController';

const QuizRoutes = Router();
QuizRoutes.get(
  '/classrooms/:cid/quizzes/:id',
  ensureAuth,
  QuizController.getQuiz
);
QuizRoutes.get(
  '/classrooms/:cid/quizzes',
  ensureAuth,
  QuizController.getQuizzes
);
QuizRoutes.post(
  '/classrooms/:cid/quizzes',
  ensureAuth,
  QuizController.createQuiz
);
QuizRoutes.put(
  '/classrooms/:cid/quizzes/:id',
  ensureAuth,
  QuizController.updateQuiz
);
QuizRoutes.delete(
  '/classrooms/:cid/quizzes/:id',
  ensureAuth,
  QuizController.deleteQuiz
);
export default QuizRoutes;
