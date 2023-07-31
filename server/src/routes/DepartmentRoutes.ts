import { Router } from 'express';
import ensureAuth from '../middleware/ensureAuth';
import DepartmentController from '../controllers/DepartmentController';

const DepartmentRoutes = Router();
DepartmentRoutes.get(
  '/departments/:id',
  ensureAuth,
  DepartmentController.getDepartment
);
DepartmentRoutes.get(
  '/departments',
  ensureAuth,
  DepartmentController.getDepartments
);
DepartmentRoutes.post(
  '/departments',
  ensureAuth,
  DepartmentController.createDepartment
);
DepartmentRoutes.put(
  '/departments/:id',
  ensureAuth,
  DepartmentController.updateDepartment
);
DepartmentRoutes.delete(
  '/departments/:id',
  ensureAuth,
  DepartmentController.deleteDepartment
);
export default DepartmentRoutes;
