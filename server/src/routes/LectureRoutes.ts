import { Router } from 'express';
import ensureAuth from '../middleware/ensureAuth';
import LectureController from '../controllers/LectureController';

const LectureRoutes = Router();
LectureRoutes.get(
  '/classrooms/:cid/lectures/:id',
  ensureAuth,
  LectureController.getLecture
);
LectureRoutes.get(
  '/classrooms/:cid/lectures',
  ensureAuth,
  LectureController.getLectures
);
LectureRoutes.post(
  '/classrooms/:cid/lectures',
  ensureAuth,
  LectureController.createLecture
);
LectureRoutes.put(
  '/classrooms/:cid/lectures/:id',
  ensureAuth,
  LectureController.updateLecture
);
LectureRoutes.delete(
  '/classrooms/:cid/lectures/:id',
  ensureAuth,
  LectureController.deleteLecture
);
export default LectureRoutes;
