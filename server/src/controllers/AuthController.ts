import { Request, Response } from 'express';
import validate from '../validators/validate';
import { LoginSchema } from '../validators/schemas/AuthSchema';
import AuthService from '../services/AuthService';
import dayjs from 'dayjs';
import * as dotenv from 'dotenv';
import httpErrorHandler from '../utils/httpErrorHandler';
import Lecturer from '../models/Lecturer';
import LecturerDTO from '../models/DTOs/LecturerDTO';
import StudentDTO from '../models/DTOs/StudentDTO';
import Student from '../models/Student';
import { Roles } from '../models/enums/Roles';
import UserDTO from '../models/DTOs/UserDTO';
import Department from '../models/Department';
import DepartmentDTO from '../models/DTOs/DepartmentDTO';
import Level from '../models/Level';
import LevelDTO from '../models/DTOs/LevelDTO';
dotenv.config();

const AUTH_SESSION = process.env.AUTH_SESSION as string;
const authService = new AuthService();
export default class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const data = await validate(LoginSchema, req.body);
      const session = await authService.login(data);
      res.cookie(AUTH_SESSION, session, {
        secure: true,
        httpOnly: process.env.NODE_ENV === 'production',
        expires: dayjs().add(1, 'days').toDate(),
        sameSite: 'none',
      });

      const user = await authService.getUserFromSession(session);
      res.send({ status: 'OK', role: user.role });
    } catch (error: any) {
      httpErrorHandler(error, res);
    }
  }

  static async currentUser(req: Request, res: Response) {
    const session = req.cookies.session;

    try {
      const user = await authService.getUserFromSession(session);
      const data = await user.reload({
        include: [
          {
            model: Lecturer,
            attributes: LecturerDTO,
            include: [{ model: Department, attributes: DepartmentDTO }],
          },
          {
            model: Student,
            attributes: StudentDTO,
            include: [
              { model: Department, attributes: DepartmentDTO },
              { model: Level, attributes: LevelDTO },
            ],
          },
        ],
        attributes: UserDTO,
      });
      res.send(data);
    } catch (error: any) {
      httpErrorHandler(error, res);
    }
  }

  static async logout(req: Request, res: Response) {
    const session = req.cookies.session;

    try {
      await authService.logout(session);
      res.clearCookie(AUTH_SESSION);
      res.status(204).send({ status: 'OK' });
    } catch (error: any) {
      httpErrorHandler(error, res);
    }
  }
}
