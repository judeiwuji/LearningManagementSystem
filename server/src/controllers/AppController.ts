import { Request, Response } from 'express';
import AppService from '../services/AppService';

const appService = new AppService();

export default class AppController {
  static getStatus(req: Request, res: Response) {
    res.send({ status: 'OK' });
  }

  static async install(req: Request, res: Response) {
    try {
      await appService.install();
      res.status(201).send({ status: 'OK', message: 'Installed' });
    } catch (error: any) {
      const code = error.code || 400;
      res.status(code).send({ error: error.message });
    }
  }

  static async getLevels(req: Request, res: Response) {
    res.send(await appService.getLevels());
  }
}
