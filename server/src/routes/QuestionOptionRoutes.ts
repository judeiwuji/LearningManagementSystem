import { Router } from 'express';
import ensureAuth from '../middleware/ensureAuth';
import QuestionOptionController from '../controllers/QuestionOptionController';

const QuestionOptionRoutes = Router();
QuestionOptionRoutes.post(
  '/questions/:qid/options',
  ensureAuth,
  QuestionOptionController.addOption
);

QuestionOptionRoutes.put(
  '/questions/:qid/options/:id',
  ensureAuth,
  QuestionOptionController.updateOption
);

QuestionOptionRoutes.delete(
  '/questions/:qid/options/:id',
  ensureAuth,
  QuestionOptionController.removeOption
);

export default QuestionOptionRoutes;
