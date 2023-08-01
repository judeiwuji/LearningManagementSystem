import { Op } from 'sequelize';
import UserDTO from '../models/DTOs/UserDTO';
import Pagination from '../models/Pagination';
import User, { UserAttributes, UserCreationAttributes } from '../models/User';
import DB from '../models/engine/DBStorage';
import { Roles } from '../models/enums/Roles';
import NotFoundError from '../models/errors/NotFoundError';
import BcryptUtil from '../utils/BcryptUtil';
import Department from '../models/Department';
import Lecturer, {
  LecturerAttributes,
  LecturerCreationAtttributes,
} from '../models/Lecturer';
import LecturerDTO from '../models/DTOs/LecturerDTO';

export default class LecturerService {
  lecturerInclude(query: any = {}) {
    return [
      { model: User, attributes: UserDTO, where: query },
      { model: Department },
    ];
  }

  async createLecturer(
    data: UserCreationAttributes & LecturerCreationAtttributes
  ) {
    const transaction = await DB.transaction();

    try {
      const emailExists = await User.findOne({ where: { email: data.email } });

      if (emailExists) {
        throw new Error('Email already exists');
      }

      const hashedPassword = await BcryptUtil.hashPassword(data.password);
      const user = await User.create(
        {
          email: data.email,
          firstname: data.firstname,
          lastname: data.lastname,
          password: hashedPassword,
          role: Roles.LECTURER,
        },
        { transaction }
      );

      const lecturer = await Lecturer.create(
        {
          departmentId: data.departmentId,
          userId: user.id,
        },
        { transaction }
      );

      await transaction.commit();
      return (await Lecturer.findOne({
        where: { id: lecturer.id },
        include: this.lecturerInclude(),
      })) as Lecturer;
    } catch (error: any) {
      await transaction.rollback();
      throw new Error(error.message);
    }
  }

  async findLecturerBy(query: any) {
    const lecturer = await Lecturer.findOne({
      where: query,
      include: this.lecturerInclude(),
      attributes: LecturerDTO,
    });

    if (!lecturer) {
      throw new NotFoundError();
    }
    return lecturer;
  }

  async getLecturers(page: number, search?: string) {
    const pager = new Pagination(page);
    const query: any = {};
    if (search) {
      query[Op.or] = [
        {
          firstname: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          lastname: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          email: {
            [Op.like]: `%${search}%`,
          },
        },
      ];
    }

    const { rows, count } = await Lecturer.findAndCountAll({
      limit: pager.pageSize,
      offset: pager.startIndex,
      include: this.lecturerInclude(query),
      attributes: LecturerDTO,
    });

    return {
      page,
      results: rows,
      totalPages: pager.totalPages(count),
    };
  }

  async updateLecturer(id: number, data: LecturerAttributes & UserAttributes) {
    const lecturer = await this.findLecturerBy({ id });
    await lecturer.update({
      departmentId: data.departmentId,
    });
    await lecturer.user.update({
      firstname: data.firstname,
      lastname: data.lastname,
    });
    return lecturer.reload();
  }

  async deleteLecturer(id: number) {
    const lecturer = await this.findLecturerBy({ id });
    lecturer.destroy();
  }

  async getCount() {
    return Lecturer.count({});
  }
}
