import { Op } from 'sequelize';
import DepartmentDTO from '../models/DTOs/DepartmentDTO';
import QuizResultDTO from '../models/DTOs/QuizResultDTO';
import StudentDTO from '../models/DTOs/StudentDTO';
import UserDTO from '../models/DTOs/UserDTO';
import Department from '../models/Department';
import Pagination from '../models/Pagination';
import QuestionAnswer from '../models/QuestionAnswer';
import QuizResult from '../models/QuizResult';
import Student from '../models/Student';
import User from '../models/User';
import StudentService from './StudentService';
import Quiz from '../models/Quiz';
import QuizDTO from '../models/DTOs/QuizDTO';
import ClassRoom from '../models/ClassRoom';
import ClassRoomDTO from '../models/DTOs/ClassRoomDTO';
import Lecturer from '../models/Lecturer';
import LecturerDTO from '../models/DTOs/LecturerDTO';
import NotFoundError from '../models/errors/NotFoundError';
import QuizQuestion from '../models/QuizQuestion';

export default class QuizResultService {
  private studentService = new StudentService();

  async computeQuizResult(quizId: number, userId: number) {
    const student = await this.studentService.findStudentBy({});

    const result = await QuizResult.findOne({
      where: { quizId, studentId: student.id },
    });

    if (result) {
      return result;
    }

    const score = await QuestionAnswer.sum('score', {
      where: { quizId, studentId: student.id },
    });
    return QuizResult.create({
      quizId,
      score,
      studentId: student.id,
      questionCount: await QuizQuestion.count({ where: { quizId } }),
    });
  }

  async getQuizResults(quizId: number, page: number, search = '') {
    const pager = new Pagination(page);
    const query: any = { quizId };

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
    const { rows, count } = await QuizResult.findAndCountAll({
      attributes: QuizResultDTO,
      include: [
        {
          model: Student,
          attributes: StudentDTO,
          include: [
            { model: User, attributes: UserDTO },
            { model: Department, attributes: DepartmentDTO },
          ],
        },
      ],
      limit: pager.pageSize,
      offset: pager.startIndex,
      where: query,
    });

    return {
      results: rows,
      page,
      totalPages: pager.totalPages(count),
    };
  }

  async getStudentQuizzesResult(userId: number, page = 1) {
    const student = await this.studentService.findStudentBy({ userId });
    const pager = new Pagination(page);

    const { rows, count } = await QuizResult.findAndCountAll({
      attributes: QuizResultDTO,
      include: [
        {
          model: Quiz,
          attributes: QuizDTO,
          include: [
            { model: ClassRoom, attributes: ClassRoomDTO },
            {
              model: Lecturer,
              attributes: LecturerDTO,
              include: [{ model: User, attributes: UserDTO }],
            },
          ],
        },
      ],
      limit: pager.pageSize,
      offset: pager.startIndex,
      where: { studentId: student.id },
    });

    return {
      results: rows,
      page,
      totalPages: pager.totalPages(count),
    };
  }

  async findBy(query: any = {}) {
    const result = await QuizResult.findOne({
      where: query,
    });

    if (!result) {
      throw new NotFoundError('Result not found');
    }
    return result;
  }
}
