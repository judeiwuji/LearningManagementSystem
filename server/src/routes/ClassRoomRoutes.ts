import { Router } from 'express';
import ensureAuth from '../middleware/ensureAuth';
import ClassRoomController from '../controllers/ClassRoomController';

const ClassRoomRoutes = Router();
ClassRoomRoutes.get(
  '/classrooms/:id/students',
  ensureAuth,
  ClassRoomController.getStudents
);
ClassRoomRoutes.post(
  '/classrooms/:id/students',
  ensureAuth,
  ClassRoomController.addStudent
);
ClassRoomRoutes.delete(
  '/classrooms/:cid/students/:id',
  ensureAuth,
  ClassRoomController.removeStudent
);
ClassRoomRoutes.get(
  '/classrooms/:id',
  ensureAuth,
  ClassRoomController.getClassRoom
);
ClassRoomRoutes.get(
  '/classrooms',
  ensureAuth,
  ClassRoomController.getClassRooms
);
ClassRoomRoutes.post(
  '/classrooms',
  ensureAuth,
  ClassRoomController.createClassRoom
);
ClassRoomRoutes.put(
  '/classrooms/:id',
  ensureAuth,
  ClassRoomController.updateClassRoom
);
ClassRoomRoutes.delete(
  '/classrooms/:id',
  ensureAuth,
  ClassRoomController.deleteClassRoom
);
export default ClassRoomRoutes;
