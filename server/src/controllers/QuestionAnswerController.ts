import { Request, Response } from 'express';
import IRequest from '../models/interfaces/IRequest';
import validate from '../validators/validate';
import { QuestionAnswerCreationSchema } from '../validators/schemas/QuestionAnswerSchema';
import QuestionAnswerService from '../services/QuestionAnswerService';
import httpErrorHandler from '../utils/httpErrorHandler';

const questionAnswerService = new QuestionAnswerService();
export default class QuestionAnswerController {
  static async answerQuestion(req: IRequest, res: Response) {
    try {
      const quizId = Number(req.params.qid);
      const questionId = Number(req.params.queId);
      const user = req.user;
      const data = await validate(QuestionAnswerCreationSchema, req.body);
      const answer = await questionAnswerService.answerQuestion(
        data,
        quizId,
        questionId,
        user?.id
      );
      res.status(201).send(answer);
    } catch (error) {
      httpErrorHandler(error, res);
    }
  }

  static async getStudentQuizResult(req: IRequest, res: Response) {
    try {
      const quizId = Number(req.params.qid);
      const studentId = Number(req.params.sid);
      const user = req.user;
      const data = await questionAnswerService.getStudentQuizScore(
        quizId,
        studentId
      );
      res.send(data);
    } catch (error) {
      httpErrorHandler(error, res);
    }
  }

  static async getStudentQuizzesResult(req: IRequest, res: Response) {
    try {
      const page = Number(req.query.page) || 1;
      const user = req.user;
      const data = await questionAnswerService.getStudentQuizzesResult(
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
      const data = await questionAnswerService.getQuizResults(quizId, page);
      res.send(data);
    } catch (error) {
      httpErrorHandler(error, res);
    }
  }
}
