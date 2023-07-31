import { Application } from 'express';
import AppRoutes from './AppRoutes';
import AuthRoutes from './AuthRoutes';
import StudentRoutes from './StudentRoutes';
import LecturerRoutes from './LecturerRoutes';
import ClassRoomRoutes from './ClassRoomRoutes';

export default class RouteManager {
  private baseAPI = '/api/v1';
  constructor(private app: Application) {
    this.routes();
  }

  routes() {
    this.app.use(this.baseAPI, [
      AppRoutes,
      AuthRoutes,
      StudentRoutes,
      LecturerRoutes,
      ClassRoomRoutes,
    ]);
  }
}
