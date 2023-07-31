import { Request, Response } from 'express';
import validate from '../validators/validate';
import httpErrorHandler from '../utils/httpErrorHandler';
import QuizService from '../services/QuizService';
import {
  QuizCreationSchema,
  QuizUpdateSchema,
} from '../validators/schemas/QuizSchema';
import IRequest from '../models/interfaces/IRequest';

const quizService = new QuizService();
export default class QuizController {
  static async createQuiz(req: IRequest, res: Response) {
    try {
      const cid = Number(req.params.cid);
      const user = req.user;
      const data = await validate(QuizCreationSchema, req.body);
      const quiz = await quizService.createQuiz(data, cid, user?.id);
      res.status(201).send(quiz);
    } catch (error: any) {
      httpErrorHandler(error, res);
    }
  }

  static async getQuiz(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const quiz = await quizService.findBy({ id });
      res.send(quiz);
    } catch (error) {
      httpErrorHandler(error, res);
    }
  }

  static async getQuizzes(req: Request, res: Response) {
    const page = Number(req.query.page) || 1;
    const search = req.query.search as string;
    try {
      const data = await quizService.getQuizzes(page, search);
      res.send(data);
    } catch (error) {
      httpErrorHandler(error, res);
    }
  }

  static async updateQuiz(req: Request, res: Response) {
    const id = Number(req.params.id);
    const cid = Number(req.params.cid);
    try {
      const data = await validate(QuizUpdateSchema, req.body);
      const update = await quizService.updateQuiz(id, cid, data);
      res.send(update);
    } catch (error: any) {
      httpErrorHandler(error, res);
    }
  }

  static async deleteQuiz(req: Request, res: Response) {
    const id = Number(req.params.id);
    const cid = Number(req.params.cid);
    try {
      await quizService.deleteQuiz(id, cid);
      res.status(204).send({ status: 'OK' });
    } catch (error: any) {
      httpErrorHandler(error, res);
    }
  }
}
