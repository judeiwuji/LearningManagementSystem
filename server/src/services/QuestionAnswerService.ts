import QuestionAnswer, {
  QuestionAnswerCreationAttributes,
} from '../models/QuestionAnswer';
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
      await studentAnswer.update({
        answer: data.answer,
        score:
          question.answer.toLowerCase() === data.answer.toLowerCase() ? 1 : 0,
      });
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
}
