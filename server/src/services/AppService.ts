import LevelDTO from '../models/DTOs/LevelDTO';
import Department from '../models/Department';
import Level from '../models/Level';
import User from '../models/User';
import { Roles } from '../models/enums/Roles';
import AppError from '../models/errors/AppError';
import BcryptUtil from '../utils/BcryptUtil';
import ClassRoomService from './ClassRoomService';
import ClassRoomStudentService from './ClassRoomStudentService';
import DepartmentService from './DepartmentService';
import LecturerService from './LecturerService';
import QuizService from './QuizService';
import StudentService from './StudentService';

export default class AppService {
  async install() {
    const user = await User.findOne({ where: { role: Roles.ADMIN } });
    if (user) {
      throw new AppError('App already installed');
    }

    const hashedPassword = await BcryptUtil.hashPassword(
      process.env.DEFAULT_APP_USER_PASSWORD as string
    );
    User.create({
      email: process.env.DEFAULT_APP_USER_EMAIL as string,
      password: hashedPassword,
      firstname: process.env.DEFAULT_APP_USER_FIRSTNAME as string,
      lastname: process.env.DEFAULT_APP_USER_LASTNAME as string,
      role: Roles.ADMIN,
    });
    Level.bulkCreate([
      { name: 'nd1' },
      { name: 'nd2' },
      { name: 'hnd1' },
      { name: 'hnd2' },
    ]);

    Department.bulkCreate([
      { name: 'computer science technology' },
      { name: 'food science technology' },
      { name: 'maths and statistics' },
      { name: 'science and laboratory technology' },
    ]);
  }

  async getLevels() {
    return Level.findAll({ attributes: LevelDTO });
  }

  async getStats(user: User) {
    const departmentService = new DepartmentService();
    const classRoomService = new ClassRoomService();
    const classRoomStudentService = new ClassRoomStudentService();
    const lecturerService = new LecturerService();
    const quizService = new QuizService();
    const studentService = new StudentService();
    let stats: any[];

    switch (user.role) {
      case Roles.LECTURER:
        stats = [
          {
            name: 'classrooms',
            count: await classRoomService.getCount(user.id),
            icon: 'wifi',
          },
          {
            name: 'quizzes',
            count: await quizService.getCount(user.id),
            icon: 'tasks',
          },
        ];
        break;
      case Roles.STUDENT:
        stats = [
          {
            name: 'classrooms',
            count: await classRoomStudentService.getCount(user.id),
            icon: 'wifi',
          },
        ];
        break;
      default:
        stats = [
          {
            name: 'departments',
            count: await departmentService.getCount(),
            icon: 'list-alt',
          },
          {
            name: 'lecturers',
            count: await lecturerService.getCount(),
            icon: 'chalkboard-teacher',
          },
          {
            name: 'students',
            count: await studentService.getCount(),
            icon: 'users',
          },
        ];
    }

    return stats;
  }
}
