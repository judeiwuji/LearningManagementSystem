import { Application } from 'express';
import AppRoutes from './AppRoutes';
import AuthRoutes from './AuthRoutes';
import StudentRoutes from './StudentRoutes';
import LecturerRoutes from './LecturerRoutes';
import ClassRoomRoutes from './ClassRoomRoutes';
import LectureRoutes from './LectureRoutes';
import QuizRoutes from './QuizRoutes';
import QuizQuestionRoutes from './QuizQuestionRoutes';
import QuestionOptionRoutes from './QuestionOptionRoutes';
import QuestionAnswerRoutes from './QuestionAsnwerRoutes';
import DepartmentRoutes from './DepartmentRoutes';
import UserRoutes from './UserRoutes';

export default class RouteManager {
  private baseAPI = '/api/v1';
  constructor(private app: Application) {
    this.routes();
  }

  routes() {
    this.app.use(this.baseAPI, [
      AppRoutes,
      AuthRoutes,
      LecturerRoutes,
      ClassRoomRoutes,
      LectureRoutes,
      QuizRoutes,
      QuizQuestionRoutes,
      QuestionOptionRoutes,
      QuestionAnswerRoutes,
      DepartmentRoutes,
      StudentRoutes,
      UserRoutes,
    ]);
  }
}
