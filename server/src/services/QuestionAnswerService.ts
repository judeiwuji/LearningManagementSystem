import ClassRoom from '../models/ClassRoom';
import ClassRoomDTO from '../models/DTOs/ClassRoomDTO';
import DepartmentDTO from '../models/DTOs/DepartmentDTO';
import LecturerDTO from '../models/DTOs/LecturerDTO';
import QuizDTO from '../models/DTOs/QuizDTO';
import StudentDTO from '../models/DTOs/StudentDTO';
import UserDTO from '../models/DTOs/UserDTO';
import Department from '../models/Department';
import Lecturer from '../models/Lecturer';
import Pagination from '../models/Pagination';
import QuestionAnswer, {
  QuestionAnswerCreationAttributes,
} from '../models/QuestionAnswer';
import Quiz from '../models/Quiz';
import Student from '../models/Student';
import User from '../models/User';
import DB from '../models/engine/DBStorage';
import QuizQuestionService from './QuizQuestionService';
import QuizService from './QuizService';
import StudentService from './StudentService';

export default class QuestionAnswerService {
  private quizService = new QuizService();
  private questionService = new QuizQuestionService();
  private studentService = new StudentService();

  async answerQuestion(
    data: QuestionAnswerCreationAttributes,
    quizId: number,
    questionId: number,
    userId: number
  ) {
    const quiz = await this.quizService.findBy({ id: quizId });
    const question = await this.questionService.findBy(
      { id: questionId },
      true
    );
    const student = await this.studentService.findStudentBy({ userId });
    const studentAnswer = await QuestionAnswer.findOne({
      where: { studentId: student.id, questionId },
    });

    if (studentAnswer) {
      await studentAnswer.update({ answer: data.answer });
      return studentAnswer.reload();
    }
    const answer = await QuestionAnswer.create({
      answer: data.answer,
      quizId: quiz.id,
      questionId: question.id,
      studentId: student.id,
      score:
        question.answer.toLowerCase() === data.answer.toLowerCase() ? 1 : 0,
    });
    return answer;
  }

  async getStudentQuizScore(quizId: number, studentId: number) {
    const student = await this.studentService.findStudentBy({ id: studentId });

    return {
      score: await QuestionAnswer.sum('score', {
        where: { quizId, studentId: student.id },
      }),
    };
  }

  // async getStudentQuizzesResult(userId: number, page = 1) {
  //   const student = await this.studentService.findStudentBy({ userId });
  //   const pager = new Pagination(page);

  //   const { rows, count } = await QuestionAnswer.findAndCountAll({
  //     group: ['quizId'],
  //     attributes: ['id', [DB.fn('sum', DB.col('score')), 'score']],
  //     include: [
  //       {
  //         model: Quiz,
  //         attributes: QuizDTO,
  //         include: [
  //           { model: ClassRoom, attributes: ClassRoomDTO },
  //           {
  //             model: Lecturer,
  //             attributes: LecturerDTO,
  //             include: [{ model: User, attributes: UserDTO }],
  //           },
  //         ],
  //       },
  //     ],
  //     limit: pager.pageSize,
  //     offset: pager.startIndex,
  //     where: { studentId: student.id },
  //   });

  //   return {
  //     results: rows,
  //     page,
  //     totalPages: pager.totalPages(count.length),
  //   };
  // }

  // async getQuizResults(quizId: number, page = 1) {
  //   const pager = new Pagination(page);

  //   const { rows, count } = await QuestionAnswer.findAndCountAll({
  //     group: ['studentId'],
  //     attributes: ['id', [DB.fn('sum', DB.col('score')), 'score']],
  //     include: [
  //       {
  //         model: Student,
  //         attributes: StudentDTO,
  //         include: [
  //           { model: User, attributes: UserDTO },
  //           { model: Department, attributes: DepartmentDTO },
  //         ],
  //       },
  //     ],
  //     limit: pager.pageSize,
  //     offset: pager.startIndex,
  //     where: { quizId },
  //   });

  //   return {
  //     results: rows,
  //     page,
  //     totalPages: pager.totalPages(count.length),
  //   };
  // }
}
