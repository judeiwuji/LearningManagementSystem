import { Request, Response } from 'express';
import validate from '../validators/validate';
import httpErrorHandler from '../utils/httpErrorHandler';
import QuizService from '../services/QuizService';
import {
  QuizCreationSchema,
  QuizUpdateSchema,
} from '../validators/schemas/QuizSchema';
import IRequest from '../models/interfaces/IRequest';
import QuizResultService from '../services/QuizResultService';
import Student from '../models/Student';

const quizService = new QuizService();
const quizResultService = new QuizResultService();

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

  static async getQuizzes(req: IRequest, res: Response) {
    const page = Number(req.query.page) || 1;
    const search = req.query.search as string;
    const user = req.user;
    try {
      const data = await quizService.getQuizzes(user?.id, page, search);
      res.send(data);
    } catch (error) {
      httpErrorHandler(error, res);
    }
  }

  static async getStudentQuizzes(req: IRequest, res: Response) {
    const page = Number(req.query.page) || 1;
    const search = req.query.search as string;
    const user = req.user;
    try {
      const data = await quizService.getStudentQuizzes(user?.id, page, search);
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

  static async submitQuiz(req: IRequest, res: Response) {
    try {
      const quizId = Number(req.params.qid);
      const user = req.user;
      console.log(user);
      const data = await quizResultService.computeQuizResult(quizId, user?.id);
      res.send(data);
    } catch (error) {
      httpErrorHandler(error, res);
    }
  }

  static async getStudentQuizResult(req: IRequest, res: Response) {
    try {
      const quizId = Number(req.params.qid);
      const user = await req.user?.reload({ include: [{ model: Student }] });
      const data = await quizResultService.findBy({
        quizId,
        studentId: user?.student.id,
      });
      res.send(data);
    } catch (error) {
      res.send(null);
    }
  }

  static async getStudentQuizzesResult(req: IRequest, res: Response) {
    try {
      const page = Number(req.query.page) || 1;
      const user = req.user;
      const data = await quizResultService.getStudentQuizzesResult(
        user?.id,
        page
      );
      res.send(data);
    } catch (error) {
      httpErrorHandler(error, res);
    }
  }

  static async getQuizResults(req: IRequest, res: Response) {
    try {
      const page = Number(req.query.page) || 1;
      const quizId = Number(req.params.qid);
      const data = await quizResultService.getQuizResults(quizId, page);
      res.send(data);
    } catch (error) {
      httpErrorHandler(error, res);
    }
  }
}
