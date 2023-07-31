import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/AuthService';
import IRequest from '../models/interfaces/IRequest';

export default async function deserializeUser(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  const session = req.cookies[process.env.AUTH_SESSION as string];

  if (session) {
    try {
      const authService = new AuthService();
      req.user = await authService.getUserFromSession(session);
    } catch (error) {
      console.log('Failed to deserialize user');
    }
  }
  next();
}
