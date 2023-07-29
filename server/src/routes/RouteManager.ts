import { Application } from 'express';
import AppRoutes from './AppRoutes';

export default class RouteManager {
  private baseAPI = '/api/v1';
  constructor(private app: Application) {
    this.routes();
  }

  routes() {
    this.app.use(this.baseAPI, [AppRoutes]);
  }
}
