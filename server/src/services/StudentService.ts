import { Op } from 'sequelize';
import UserDTO from '../models/DTOs/UserDTO';
import Pagination from '../models/Pagination';
import Student, {
  StudentAttributes,
  StudentCreationAtttributes,
} from '../models/Student';
import User, { UserAttributes, UserCreationAttributes } from '../models/User';
import DB from '../models/engine/DBStorage';
import { Roles } from '../models/enums/Roles';
import NotFoundError from '../models/errors/NotFoundError';
import BcryptUtil from '../utils/BcryptUtil';
import Department from '../models/Department';
import Level from '../models/Level';
import StudentDTO from '../models/DTOs/StudentDTO';

const studentInclude = [
  { model: User, attributes: UserDTO },
  { model: Department },
  { model: Level },
];

export default class StudentService {
  async createStudent(
    data: UserCreationAttributes & StudentCreationAtttributes
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
          role: Roles.STUDENT,
        },
        { transaction }
      );

      const student = await Student.create(
        {
          departmentId: data.departmentId,
          levelId: data.levelId,
          userId: user.id,
        },
        { transaction }
      );

      await transaction.commit();
      return (await Student.findOne({
        where: { id: student.id },
        include: [{ model: User, attributes: UserDTO }],
      })) as Student;
    } catch (error: any) {
      await transaction.rollback();
      throw new Error(error.message);
    }
  }

  async findStudentBy(query: any) {
    const student = await Student.findOne({
      where: query,
      include: studentInclude,
      attributes: StudentDTO,
    });

    if (!student) {
      throw new NotFoundError();
    }
    return student;
  }

  async getStudents(page: number, search?: string) {
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

    const { rows, count } = await Student.findAndCountAll({
      limit: pager.pageSize,
      offset: pager.startIndex,
      where: query,
      include: studentInclude,
      attributes: StudentDTO,
    });

    return {
      page,
      results: rows,
      totalPages: pager.totalPages(count),
    };
  }

  async updateStudent(id: number, data: StudentAttributes & UserAttributes) {
    const student = await this.findStudentBy({ id });
    await student.update({
      departmentId: data.departmentId,
      levelId: data.levelId,
    });
    await student.user.update({
      firstname: data.firstname,
      lastname: data.lastname,
    });
    return student.reload();
  }

  async deleteStudent(id: number) {
    const student = await this.findStudentBy({ id });
    student.destroy();
  }
}
