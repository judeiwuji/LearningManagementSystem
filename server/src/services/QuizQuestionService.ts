import { Op } from 'sequelize';
import UserDTO from '../models/DTOs/UserDTO';
import Pagination from '../models/Pagination';
import User from '../models/User';
import NotFoundError from '../models/errors/NotFoundError';
import Quiz from '../models/Quiz';
import LecturerService from './LecturerService';
import QuizQuestion, {
  QuizQuestionAttributes,
  QuizQuestionCreationAttributes,
} from '../models/QuizQuestion';
import DB from '../models/engine/DBStorage';
import QuestionOption, {
  QuestionOptionCreationAttributes,
} from '../models/QuestionOption';
import AppError from '../models/errors/AppError';
import QuizQuestionDTO from '../models/DTOs/QuizQuestionDTO';
import QuestionOptionDTO from '../models/DTOs/QuestionOptionDTO';

export default class QuizQuestionService {
  private questionInclude(query: any = {}) {
    return [
      {
        model: QuestionOption,
        attributes: QuestionOptionDTO,
      },
    ];
  }

  private lecturerService = new LecturerService();

  async createQuestion(data: QuizQuestionCreationAttributes, quizId: number) {
    const transaction = await DB.transaction();

    try {
      const question = await QuizQuestion.create(
        {
          answer: data.answer,
          question: data.question,
          quizId,
        },
        { transaction }
      );

      if (data.options) {
        const options: QuestionOptionCreationAttributes[] = data.options.map(
          (d) => ({
            questionId: question.id,
            option: d as string,
          })
        );

        await QuestionOption.bulkCreate(options, { transaction });
      }

      await transaction.commit();

      return (await QuizQuestion.findByPk(question.id, {
        include: this.questionInclude(),
      })) as QuizQuestion;
    } catch (error: any) {
      transaction.rollback();
      throw new AppError(error.message);
    }
  }

  async findBy(query: any) {
    const question = await QuizQuestion.findOne({
      where: query,
      include: this.questionInclude(),
      attributes: QuizQuestionDTO,
    });

    if (!question) {
      throw new NotFoundError();
    }
    return question;
  }

  async getQuestions(quizId: number, page: number, search?: string) {
    const pager = new Pagination(page);
    const query: any = {
      quizId,
    };
    if (search) {
      query.question = {
        [Op.like]: `%${search}%`,
      };
    }

    const { rows, count } = await QuizQuestion.findAndCountAll({
      limit: pager.pageSize,
      offset: pager.startIndex,
      include: this.questionInclude(query),
      attributes: QuizQuestionDTO,
    });

    return {
      page,
      results: rows,
      totalPages: pager.totalPages(count),
    };
  }

  async updateQuestion(
    id: number,
    quizId: number,
    data: QuizQuestionAttributes
  ) {
    const question = await this.findBy({ id, quizId });
    await question.update({
      question: data.question,
      answer: data.answer,
    });
    return question.reload();
  }

  async deleteQuestion(id: number, quizId: number) {
    const question = await this.findBy({ id, quizId });
    question.destroy();
  }
}
