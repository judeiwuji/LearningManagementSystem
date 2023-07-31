import { Request, Response } from 'express';
import validate from '../validators/validate';
import httpErrorHandler from '../utils/httpErrorHandler';
import DepartmentService from '../services/DepartmentService';
import {
  DepartmentCreationSchema,
  DepartmentUpdateSchema,
} from '../validators/schemas/DepartmentSchema';

const departmentService = new DepartmentService();
export default class DepartmentController {
  static async createDepartment(req: Request, res: Response) {
    try {
      const data = await validate(DepartmentCreationSchema, req.body);
      const department = await departmentService.createDepartment(data);
      res.status(201).send(department);
    } catch (error: any) {
      httpErrorHandler(error, res);
    }
  }

  static async getDepartment(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const department = await departmentService.findBy({ id });
      res.send(department);
    } catch (error) {
      httpErrorHandler(error, res);
    }
  }

  static async getDepartments(req: Request, res: Response) {
    const page = Number(req.query.page) || 1;
    const search = req.query.search as string;
    try {
      const results = await departmentService.getDepartments(page, search);
      res.send(results);
    } catch (error) {
      httpErrorHandler(error, res);
    }
  }

  static async updateDepartment(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      const data = await validate(DepartmentUpdateSchema, req.body);
      const update = await departmentService.updateDepartment(id, data);
      res.send(update);
    } catch (error: any) {
      httpErrorHandler(error, res);
    }
  }

  static async deleteDepartment(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      await departmentService.deleteDepartment(id);
      res.status(204).send({ status: 'OK' });
    } catch (error: any) {
      httpErrorHandler(error, res);
    }
  }
}
