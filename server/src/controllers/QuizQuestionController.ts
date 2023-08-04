import { Request, Response } from 'express';
import validate from '../validators/validate';
import httpErrorHandler from '../utils/httpErrorHandler';
import IRequest from '../models/interfaces/IRequest';
import QuizQuestionService from '../services/QuizQuestionService';
import {
  QuizQuestionCreationSchema,
  QuizQuestionUpdateSchema,
} from '../validators/schemas/QuizQuestionSchema';
import User from '../models/User';

const questionService = new QuizQuestionService();
export default class QuizQuestionController {
  static async createQuestion(req: IRequest, res: Response) {
    try {
      const qid = Number(req.params.qid);
      const data = await validate(QuizQuestionCreationSchema, req.body);
      const question = await questionService.createQuestion(data, qid);
      res.status(201).send(question);
    } catch (error: any) {
      httpErrorHandler(error, res);
    }
  }

  static async getQuestion(req: Request, res: Response) {
    const id = req.params.id;
    const quizId = req.params.qid;
    try {
      const question = await questionService.findBy({ id, quizId });
      res.send(question);
    } catch (error) {
      httpErrorHandler(error, res);
    }
  }

  static async getQuestions(req: IRequest, res: Response) {
    const user = req.user as User;
    const qid = Number(req.params.qid);
    const page = Number(req.query.page) || 1;
    const search = req.query.search as string;
    try {
      const data = await questionService.getQuestions(user, qid, page, search);
      res.send(data);
    } catch (error) {
      httpErrorHandler(error, res);
    }
  }

  static async getQuizQuestions(req: IRequest, res: Response) {
    const qid = Number(req.params.qid);
    try {
      const user = req.user;
      const data = await questionService.getQuizQuestions(qid, user?.id);
      res.send(data);
    } catch (error) {
      httpErrorHandler(error, res);
    }
  }

  static async updateQuestion(req: Request, res: Response) {
    const id = Number(req.params.id);
    const qid = Number(req.params.qid);
    try {
      const data = await validate(QuizQuestionUpdateSchema, req.body);
      const update = await questionService.updateQuestion(id, qid, data);
      res.send(update);
    } catch (error: any) {
      httpErrorHandler(error, res);
    }
  }

  static async deleteQuestion(req: Request, res: Response) {
    const id = Number(req.params.id);
    const qid = Number(req.params.qid);
    try {
      await questionService.deleteQuestion(id, qid);
      res.status(204).send({ status: 'OK' });
    } catch (error: any) {
      httpErrorHandler(error, res);
    }
  }
}
