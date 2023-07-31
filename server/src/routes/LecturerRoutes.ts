import { Router } from 'express';
import ensureAuth from '../middleware/ensureAuth';
import LecturerController from '../controllers/LecturerController';

const LecturerRoutes = Router();
LecturerRoutes.get(
  '/lecturers/:id',
  ensureAuth,
  LecturerController.getLecturer
);
LecturerRoutes.get('/lecturers', ensureAuth, LecturerController.getLecturers);
LecturerRoutes.post(
  '/lecturers',
  ensureAuth,
  LecturerController.createLecturer
);
LecturerRoutes.put(
  '/lecturers/:id',
  ensureAuth,
  LecturerController.updateLecturer
);
LecturerRoutes.delete(
  '/lecturers/:id',
  ensureAuth,
  LecturerController.deleteLecturer
);
export default LecturerRoutes;
