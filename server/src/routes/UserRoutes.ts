import { Router } from 'express';
import ensureAuth from '../middleware/ensureAuth';
import UserController from '../controllers/UserController';

const UserRoutes = Router();

UserRoutes.get('/users/identify', UserController.identifyUser);
UserRoutes.get(
  '/users/changePassword',
  ensureAuth,
  UserController.changePassword
);
UserRoutes.get('/users/resetPassword', UserController.resetPassword);
export default UserRoutes;
