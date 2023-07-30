import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/AuthService';

export default function ensureAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const session = req.cookies[process.env.AUTH_SESSION as string];

  if (!session) {
    res.status(401).send({ error: 'Not authorized' });
    return;
  }

  try {
    const authService = new AuthService();
    authService.getUserFromSession(session);
  } catch (error) {
    res.status(401).send({ error: 'Not authorized' });
    return;
  }
  next();
}
