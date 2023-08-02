import { Request, Response } from 'express';
import validate from '../validators/validate';
import httpErrorHandler from '../utils/httpErrorHandler';
import LecturerService from '../services/LecturerService';
import {
  LecturerCreationSchema,
  LecturerUpdateSchema,
} from '../validators/schemas/LecturerSchema';
import LectureService from '../services/LectureService';
import IRequest from '../models/interfaces/IRequest';
import {
  LectureCreationSchema,
  LectureUpdateSchema,
} from '../validators/schemas/LectureSchema';

const lectureService = new LectureService();
export default class LectureController {
  static async createLecture(req: IRequest, res: Response) {
    try {
      const cid = Number(req.params.cid);
      const user = req.user;
      const data = await validate(LectureCreationSchema, req.body);
      const lecture = await lectureService.createLecture(data, user?.id, cid);
      res.status(201).send(lecture);
    } catch (error: any) {
      httpErrorHandler(error, res);
    }
  }

  static async getLecture(req: Request, res: Response) {
    const id = Number(req.params.id);
    const cid = Number(req.params.cid);
    try {
      const lecture = await lectureService.findBy({ id, classRoomId: cid });
      res.send(lecture);
    } catch (error) {
      httpErrorHandler(error, res);
    }
  }

  static async getLectures(req: Request, res: Response) {
    const page = Number(req.query.page) || 1;
    const search = req.query.search as string;
    const cid = Number(req.params.cid);
    try {
      const data = await lectureService.getLectures(cid, page, search);
      res.send(data);
    } catch (error) {
      httpErrorHandler(error, res);
    }
  }

  static async updateLecture(req: IRequest, res: Response) {
    const id = Number(req.params.id);
    const classRoomId = Number(req.params.cid);
    try {
      const user = req.user;
      const data = await validate(LectureUpdateSchema, req.body);
      const update = await lectureService.updateLecture(
        id,
        classRoomId,
        data,
        user?.id
      );
      res.send(update);
    } catch (error: any) {
      httpErrorHandler(error, res);
    }
  }

  static async deleteLecture(req: IRequest, res: Response) {
    const id = Number(req.params.id);
    const classRoomId = Number(req.params.cid);
    try {
      const user = req.user;
      await lectureService.deleteLecture(id, classRoomId, user?.id);
      res.status(204).send({ status: 'OK' });
    } catch (error: any) {
      httpErrorHandler(error, res);
    }
  }
}
