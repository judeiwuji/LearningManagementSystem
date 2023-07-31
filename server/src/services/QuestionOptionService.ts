import QuestionOption, {
  QuestionOptionAttributes,
  QuestionOptionCreationAttributes,
} from '../models/QuestionOption';
import NotFoundError from '../models/errors/NotFoundError';

export default class QuestionOptionService {
  async findBy(query: any = {}) {
    const option = await QuestionOption.findOne({ where: query });

    if (!option) {
      throw new NotFoundError();
    }
    return option;
  }

  async addOption(data: QuestionOptionCreationAttributes, questionId: number) {
    const option = await QuestionOption.create({
      option: data.option,
      questionId,
    });
    return option;
  }

  async updateOption(
    data: QuestionOptionAttributes,
    id: number,
    questionId: number
  ) {
    const option = await this.findBy({ id, questionId });

    await option.update({ option: data.option });
    return option.reload();
  }

  async removeOption(id: number, questionId: number) {
    const option = await this.findBy({ id, questionId });
    await option.destroy();
  }
}
