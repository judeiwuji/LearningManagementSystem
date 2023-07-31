import { Router } from 'express';
import ensureAuth from '../middleware/ensureAuth';
import StudentController from '../controllers/StudentController';

const StudentRoutes = Router();
StudentRoutes.get('/students/:id', ensureAuth, StudentController.getStudent);
StudentRoutes.get('/students', ensureAuth, StudentController.getStudents);
StudentRoutes.post('/students', ensureAuth, StudentController.createStudent);
StudentRoutes.put('/students/:id', ensureAuth, StudentController.updateStudent);
StudentRoutes.delete(
  '/students/:id',
  ensureAuth,
  StudentController.deleteStudent
);
export default StudentRoutes;
