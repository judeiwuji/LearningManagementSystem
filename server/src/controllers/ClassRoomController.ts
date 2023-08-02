import { Request, Response } from 'express';
import validate from '../validators/validate';
import httpErrorHandler from '../utils/httpErrorHandler';
import LecturerService from '../services/LecturerService';
import {
  LecturerCreationSchema,
  LecturerUpdateSchema,
} from '../validators/schemas/LecturerSchema';
import ClassRoomService from '../services/ClassRoomService';
import IRequest from '../models/interfaces/IRequest';
import User from '../models/User';
import {
  ClassRoomCreationSchema,
  ClassRoomStudentSchema,
  ClassRoomUpdateSchema,
} from '../validators/schemas/ClassRoomSchema';
import ClassRoomStudentService from '../services/ClassRoomStudentService';

const classRoomService = new ClassRoomService();
const classRoomStudentService = new ClassRoomStudentService();

export default class ClassRoomController {
  static async createClassRoom(req: IRequest, res: Response) {
    try {
      const user = req.user as User;
      const data = await validate(ClassRoomCreationSchema, req.body);
      const classRoom = await classRoomService.createClassRoom(data, user.id);
      res.status(201).send(classRoom);
    } catch (error: any) {
      httpErrorHandler(error, res);
    }
  }

  static async getClassRoom(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const classRoom = await classRoomService.findBy({ id });
      res.send(classRoom);
    } catch (error) {
      httpErrorHandler(error, res);
    }
  }

  static async getClassRooms(req: IRequest, res: Response) {
    const page = Number(req.query.page) || 1;
    const search = req.query.search as string;
    try {
      const user = req.user;
      const data = await classRoomService.getClassRooms(page, user?.id, search);
      res.send(data);
    } catch (error) {
      httpErrorHandler(error, res);
    }
  }

  static async updateClassRoom(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      const data = await validate(ClassRoomUpdateSchema, req.body);
      const update = await classRoomService.updateClassRoom(id, data);
      res.send(update);
    } catch (error: any) {
      httpErrorHandler(error, res);
    }
  }

  static async deleteClassRoom(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      await classRoomService.deleteClassRoom(id);
      res.status(204).send({ status: 'OK' });
    } catch (error: any) {
      httpErrorHandler(error, res);
    }
  }

  static async getStudents(req: IRequest, res: Response) {
    const { id } = req.params;
    const page = Number(req.query.page) || 1;
    const search = req.query.search as string;
    try {
      const data = await classRoomStudentService.getStudents(
        Number(id),
        page,
        search
      );
      res.send(data);
    } catch (error) {
      httpErrorHandler(error, res);
    }
  }

  static async getStudentClassRooms(req: IRequest, res: Response) {
    const page = Number(req.query.page) || 1;
    const search = req.query.search as string;
    const user = req.user;
    try {
      const data = await classRoomStudentService.getStudentClassrooms(
        user?.id,
        page,
        search
      );
      res.send(data);
    } catch (error) {
      httpErrorHandler(error, res);
    }
  }

  static async addStudent(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await validate(ClassRoomStudentSchema, req.body);
      const student = await classRoomStudentService.addStudent(
        data,
        Number(id)
      );
      res.status(201).send(student);
    } catch (error: any) {
      httpErrorHandler(error, res);
    }
  }

  static async removeStudent(req: Request, res: Response) {
    const classRoomId = Number(req.params.cid);
    const id = Number(req.params.id);
    try {
      await classRoomStudentService.removeStudent(classRoomId, id);
      res.status(204).send({ status: 'OK' });
    } catch (error: any) {
      httpErrorHandler(error, res);
    }
  }
}
