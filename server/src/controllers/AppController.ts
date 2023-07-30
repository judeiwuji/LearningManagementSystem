import { Request, Response } from 'express';
import AppService from '../services/AppService';
import validate from '../validators/validate';
import { AppInstallSchema } from '../validators/schemas/AppSchema';

const appService = new AppService();

export default class AppController {
  static getStatus(req: Request, res: Response) {
    res.send({ status: 'OK' });
  }

  static async install(req: Request, res: Response) {
    try {
      const data = await validate(AppInstallSchema, req.body);
      await appService.install(data);
      res.status(201).send({ status: 'OK', message: 'Installed' });
    } catch (error: any) {
      const code = error.code || 400;
      res.status(code).send({ error: error.message });
    }
  }
}
