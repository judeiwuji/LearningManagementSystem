import { Request, Response } from 'express';
import validate from '../validators/validate';
import httpErrorHandler from '../utils/httpErrorHandler';
import QuestionOptionService from '../services/QuestionOptionService';
import {
  QuestionOptionCreationSchema,
  QuestionOptionUpdateSchema,
} from '../validators/schemas/QuestionOptionSchema';

const optionService = new QuestionOptionService();
export default class QuestionOptionController {
  static async addOption(req: Request, res: Response) {
    try {
      const questionId = Number(req.params.qid);
      const data = await validate(QuestionOptionCreationSchema, req.body);
      const option = await optionService.addOption(data, questionId);
      res.status(201).send(option);
    } catch (error: any) {
      httpErrorHandler(error, res);
    }
  }

  static async updateOption(req: Request, res: Response) {
    const id = Number(req.params.id);
    const questionId = Number(req.params.qid);
    try {
      const data = await validate(QuestionOptionUpdateSchema, req.body);
      const update = await optionService.updateOption(data, id, questionId);
      res.send(update);
    } catch (error: any) {
      httpErrorHandler(error, res);
    }
  }

  static async removeOption(req: Request, res: Response) {
    const id = Number(req.params.id);
    const questionId = Number(req.params.qid);
    try {
      await optionService.removeOption(id, questionId);
      res.status(204).send({ status: 'OK' });
    } catch (error: any) {
      httpErrorHandler(error, res);
    }
  }
}
