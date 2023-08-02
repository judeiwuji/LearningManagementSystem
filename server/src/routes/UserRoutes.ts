import { Router } from 'express';
import ensureAuth from '../middleware/ensureAuth';
import UserController from '../controllers/UserController';

const UserRoutes = Router();

UserRoutes.get('/users/identify', UserController.identifyUser);
UserRoutes.post(
  '/users/changePassword',
  ensureAuth,
  UserController.changePassword
);
UserRoutes.post('/users/resetPassword', UserController.resetPassword);
UserRoutes.put('/users/:id', UserController.updateUser);
export default UserRoutes;
