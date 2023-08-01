import { Request, Response } from 'express';
import UserService from '../services/UserService';
import httpErrorHandler from '../utils/httpErrorHandler';
import validate from '../validators/validate';
import {
  ChangePasswordSchema,
  ResetPasswordSchema,
} from '../validators/schemas/UserSchema';
import IRequest from '../models/interfaces/IRequest';

const userService = new UserService();
export default class UserController {
  static async identifyUser(req: Request, res: Response) {
    try {
      const user = await userService.findBy({ email: req.query.email });
      res.send(user);
    } catch (error) {
      httpErrorHandler(error, res);
    }
  }

  static async changePassword(req: IRequest, res: Response) {
    try {
      const user = req.user;
      const data = await validate(ChangePasswordSchema, req.body);
      await userService.changePassword(data, user?.id);
      res.send({ status: 'OK' });
    } catch (error) {
      httpErrorHandler(error, res);
    }
  }

  static async resetPassword(req: Request, res: Response) {
    try {
      const data = await validate(ResetPasswordSchema, req.body);
      await userService.changePassword(data, data.userId);
      res.send({ status: 'OK' });
    } catch (error) {
      httpErrorHandler(error, res);
    }
  }
}
