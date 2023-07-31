import { Router } from 'express';
import AppController from '../controllers/AppController';

const AppRoutes = Router();
AppRoutes.get('/status', AppController.getStatus);
AppRoutes.post('/install', AppController.install);
AppRoutes.get('/levels', AppController.getLevels);
export default AppRoutes;
