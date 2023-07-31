import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import ensureAuth from '../middleware/ensureAuth';

const AuthRoutes = Router();
AuthRoutes.get('/auth/currentuser', ensureAuth, AuthController.currentUser);
AuthRoutes.post('/auth/login', AuthController.login);
AuthRoutes.post('/auth/logout', AuthController.logout);
export default AuthRoutes;
