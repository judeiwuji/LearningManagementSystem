import ClassRoomStudentDTO from '../models/DTOs/ClassRoomStudentDTO';
import ClassRoomStudent, {
  ClassRoomStudentAttributes,
} from '../models/ClassRoomStudent';
import Student from '../models/Student';
import StudentDTO from '../models/DTOs/StudentDTO';
import User from '../models/User';
import UserDTO from '../models/DTOs/UserDTO';
import StudentService from './StudentService';
import Pagination from '../models/Pagination';
import { Op } from 'sequelize';
import NotFoundError from '../models/errors/NotFoundError';

export default class ClassRoomStudentService {
  private classRoomStudentInclude(query: any = {}) {
    return [
      {
        model: Student,
        attributes: StudentDTO,
        include: [{ model: User, attributes: UserDTO, where: query }],
      },
    ];
  }
  private studentService = new StudentService();

  async findBy(query: any) {
    const classRoomStudent = await ClassRoomStudent.findOne({ where: query });

    if (!classRoomStudent) {
      throw new NotFoundError();
    }

    return classRoomStudent;
  }

  async addStudent(data: ClassRoomStudentAttributes, classRoomId: number) {
    const student = await this.studentService.findStudentBy({
      id: data.studentId,
    });

    const classRoomStudent = await ClassRoomStudent.findOne({
      where: {
        studentId: data.studentId,
        classRoomId,
      },
    });

    if (classRoomStudent) {
      throw new Error('Student already exists');
    }

    await ClassRoomStudent.create({
      classRoomId,
      studentId: student.id,
    });
    return student;
  }

  async getStudents(classRoomId: number, page: number, search?: string) {
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
      ];
    }

    const { rows, count } = await ClassRoomStudent.findAndCountAll({
      limit: pager.pageSize,
      offset: pager.startIndex,
      include: this.classRoomStudentInclude(query),
      attributes: ClassRoomStudentDTO,
      where: { classRoomId },
    });

    return {
      page,
      results: rows,
      totalPages: pager.totalPages(count),
    };
  }

  async removeStudent(id: number) {
    const classRoomStudent = await this.findBy({ id });

    await classRoomStudent.destroy();
  }
}
