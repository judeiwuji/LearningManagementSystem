import { Request, Response } from 'express';
import validate from '../validators/validate';
import httpErrorHandler from '../utils/httpErrorHandler';
import LecturerService from '../services/LecturerService';
import {
  LecturerCreationSchema,
  LecturerUpdateSchema,
} from '../validators/schemas/LecturerSchema';

const lecturerService = new LecturerService();
export default class LecturerController {
  static async createLecturer(req: Request, res: Response) {
    try {
      const data = await validate(LecturerCreationSchema, req.body);
      const lecturer = await lecturerService.createLecturer(data);
      res.status(201).send(lecturer);
    } catch (error: any) {
      httpErrorHandler(error, res);
    }
  }

  static async getLecturer(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const lecturer = await lecturerService.findLecturerBy({ id });
      res.send(lecturer);
    } catch (error) {
      httpErrorHandler(error, res);
    }
  }

  static async getLecturers(req: Request, res: Response) {
    const page = Number(req.query.page) || 1;
    const search = req.query.search as string;
    try {
      const data = await lecturerService.getLecturers(page, search);
      res.send(data);
    } catch (error) {
      httpErrorHandler(error, res);
    }
  }

  static async updateLecturer(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      const data = await validate(LecturerUpdateSchema, req.body);
      const update = await lecturerService.updateLecturer(id, data);
      res.send(update);
    } catch (error: any) {
      httpErrorHandler(error, res);
    }
  }

  static async deleteLecturer(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      await lecturerService.deleteLecturer(id);
      res.status(204).send({ status: 'OK' });
    } catch (error: any) {
      httpErrorHandler(error, res);
    }
  }
}
