import { Request, Response } from 'express';
import validate from '../validators/validate';
import {
  StudentCreationSchema,
  StudentUpdateSchema,
} from '../validators/schemas/StudentSchema';
import StudentService from '../services/StudentService';
import httpErrorHandler from '../utils/httpErrorHandler';

const studentService = new StudentService();
export default class StudentController {
  static async createStudent(req: Request, res: Response) {
    try {
      const data = await validate(StudentCreationSchema, req.body);
      const student = await studentService.createStudent(data);
      res.status(201).send(student);
    } catch (error: any) {
      httpErrorHandler(error, res);
    }
  }

  static async getStudent(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const student = await studentService.findStudentBy({ id });
      res.send(student);
    } catch (error) {
      httpErrorHandler(error, res);
    }
  }

  static async getStudents(req: Request, res: Response) {
    const page = Number(req.query.page) || 1;
    const classRoomId = Number(req.query.cid);
    const search = req.query.search as string;
    try {
      const students = await studentService.getStudents(
        page,
        search,
        classRoomId
      );
      res.send(students);
    } catch (error) {
      httpErrorHandler(error, res);
    }
  }

  static async updateStudent(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      const data = await validate(StudentUpdateSchema, req.body);
      const student = await studentService.updateStudent(id, data);
      res.send(student);
    } catch (error: any) {
      httpErrorHandler(error, res);
    }
  }

  static async deleteStudent(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      await studentService.deleteStudent(id);
      res.status(204).send({ status: 'OK' });
    } catch (error: any) {
      httpErrorHandler(error, res);
    }
  }
}
