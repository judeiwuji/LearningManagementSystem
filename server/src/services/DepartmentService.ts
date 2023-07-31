import { Op } from 'sequelize';
import Pagination from '../models/Pagination';
import NotFoundError from '../models/errors/NotFoundError';
import Department, {
  DepartmentAttributes,
  DepartmentCreationAttributes,
} from '../models/Department';
import DepartmentDTO from '../models/DTOs/DepartmentDTO';
import AppError from '../models/errors/AppError';

export default class DepartmentService {
  async createDepartment(data: DepartmentCreationAttributes) {
    const departmentExists = await Department.findOne({
      where: { name: data.name },
    });

    if (departmentExists) {
      throw new AppError('Department already exists');
    }
    const department = await Department.create({ name: data.name });
    return department;
  }

  async findBy(query: any) {
    const department = await Department.findOne({
      where: query,
      attributes: DepartmentDTO,
    });

    if (!department) {
      throw new NotFoundError('Department not found');
    }
    return department;
  }

  async getDepartments(page: number, search?: string) {
    const pager = new Pagination(page);
    const query: any = {};
    if (search) {
      query.name = {
        [Op.like]: `%${search}%`,
      };
    }

    const { rows, count } = await Department.findAndCountAll({
      limit: pager.pageSize,
      offset: pager.startIndex,
      attributes: DepartmentDTO,
    });

    return {
      page,
      results: rows,
      totalPages: pager.totalPages(count),
    };
  }

  async updateDepartment(id: number, data: DepartmentAttributes) {
    const department = await this.findBy({ id });
    await department.update({
      name: data.name,
    });
    return department.reload();
  }

  async deleteDepartment(id: number) {
    const department = await this.findBy({ id });
    department.destroy();
  }
}
