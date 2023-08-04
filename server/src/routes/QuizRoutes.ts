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
QuizRoutes.get(
  '/student/quizzes',
  ensureAuth,
  QuizController.getStudentQuizzes
);

QuizRoutes.post('/quizzes/:qid/submit', QuizController.submitQuiz);
QuizRoutes.get(
  '/quizzes/:qid/students/results',
  QuizController.getStudentQuizResult
);
QuizRoutes.get('/quizzes/:qid/results', QuizController.getQuizResults);

QuizRoutes.get(
  '/student/quizzes/results',
  ensureAuth,
  QuizController.getStudentQuizzesResult
);
export default QuizRoutes;
