import { Op } from 'sequelize';
import UserDTO from '../models/DTOs/UserDTO';
import Pagination from '../models/Pagination';
import User from '../models/User';
import NotFoundError from '../models/errors/NotFoundError';
import Quiz, { QuizAttributes, QuizCreationAttributes } from '../models/Quiz';
import LecturerService from './LecturerService';
import QuizDTO from '../models/DTOs/QuizDTO';
import Lecturer from '../models/Lecturer';
import LecturerDTO from '../models/DTOs/LecturerDTO';
import { QuizStatus } from '../models/enums/QuizStatus';
import ClassRoomStudent from '../models/ClassRoomStudent';
import StudentService from './StudentService';
import ClassRoom from '../models/ClassRoom';

export default class QuizService {
  private quizInclude() {
    return [
      {
        model: Lecturer,
        attributes: LecturerDTO,
        include: [{ model: User, attributes: UserDTO }],
      },
    ];
  }

  private lecturerService = new LecturerService();
  private studentService = new StudentService();

  async createQuiz(
    data: QuizCreationAttributes,
    classRoomId: number,
    userId: number
  ) {
    const lecturer = await this.lecturerService.findLecturerBy({ userId });

    const quiz = await Quiz.create({
      classRoomId,
      lecturerId: lecturer.id,
      title: data.title,
      duration: data.duration,
      status: QuizStatus.PENDING,
    });
    return quiz;
  }

  async findBy(query: any) {
    const quiz = await Quiz.findOne({
      where: query,
      include: this.quizInclude(),
      attributes: QuizDTO,
    });

    if (!quiz) {
      throw new NotFoundError();
    }
    return quiz;
  }

  async getQuizzes(userId: number, page: number, search?: string) {
    const pager = new Pagination(page);
    const query: any = {};

    try {
      const lecturer = await this.lecturerService.findLecturerBy({ userId });
      query.lecturerId = lecturer.id;
    } catch (error) {
      // not a lecturer show all quizzes
    }

    if (search) {
      query.title = {
        [Op.like]: `%${search}%`,
      };
    }

    const { rows, count } = await Quiz.findAndCountAll({
      limit: pager.pageSize,
      offset: pager.startIndex,
      include: this.quizInclude(),
      where: query,
      attributes: QuizDTO,
    });

    return {
      page,
      results: rows,
      totalPages: pager.totalPages(count),
    };
  }

  async getStudentQuizzes(userId: number, page: number, search?: string) {
    const student = await this.studentService.findStudentBy({ userId });

    const pager = new Pagination(page);
    const query: any = {
      status: QuizStatus.ACTIVE,
    };
    if (search) {
      query.title = {
        [Op.like]: `%${search}%`,
      };
    }

    // const { rows, count } = await Quiz.findAndCountAll({
    //   limit: pager.pageSize,
    //   offset: pager.startIndex,
    //   include: [
    //     {
    //       model: Lecturer,
    //       attributes: LecturerDTO,
    //       include: [{ model: User, attributes: UserDTO }],
    //     },
    //     {
    //       model: ClassRoomStudent,
    //       as: 'classRoomStudent',
    //       where: { studentId: student.id },
    //     },
    //   ],
    //   where: query,
    //   attributes: QuizDTO,
    // });

    const { rows, count } = await ClassRoomStudent.findAndCountAll({
      limit: pager.pageSize,
      offset: pager.startIndex,
      include: [
        {
          model: ClassRoom,
          include: [
            {
              model: Lecturer,
              attributes: LecturerDTO,
              include: [{ model: User, attributes: UserDTO }],
            },
            {
              model: Quiz,
              where: { status: QuizStatus.ACTIVE },
            },
          ],
        },
      ],
      where: { studentId: student.id },
    });

    return {
      page,
      results: rows,
      totalPages: pager.totalPages(count),
    };
  }

  async updateQuiz(id: number, classRoomId: number, data: QuizAttributes) {
    const quiz = await this.findBy({ id, classRoomId });
    await quiz.update({
      title: data.title,
      duration: data.duration,
      status: data.status,
    });
    return quiz.reload();
  }

  async deleteQuiz(id: number, classRoomId: number) {
    const quiz = await this.findBy({ id, classRoomId });
    quiz.destroy();
  }

  async getCount(userId: number) {
    const lecturer = await this.lecturerService.findLecturerBy({ userId });
    return Quiz.count({ where: { lecturerId: lecturer.id } });
  }
}
