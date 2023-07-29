import { Request, Response } from 'express';

export default class AppController {
  static getStatus(req: Request, res: Response) {
    res.send({ status: 'OK' });
  }

  static install(req: Request, res: Response) {
    res.send({ status: 'OK', message: 'Installed' });
  }
}
