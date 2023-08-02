import { Router } from 'express';
import AppController from '../controllers/AppController';
import ensureAuth from '../middleware/ensureAuth';

const AppRoutes = Router();
AppRoutes.get('/status', AppController.getStatus);
AppRoutes.get('/stats', ensureAuth, AppController.getStats);
AppRoutes.post('/install', AppController.install);
AppRoutes.get('/levels', AppController.getLevels);
export default AppRoutes;
