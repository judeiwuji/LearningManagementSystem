import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import QuizQuestion from './QuizQuestion';
import { Optional } from 'sequelize';

export interface QuestionOptionAttributes {
  id: number;
  questionId: number;
  question: QuizQuestion;
  option: string;
}

export interface QuestionOptionCreationAttributes
  extends Optional<QuestionOptionAttributes, 'id' | 'question'> {}

@Table
export default class QuestionOption extends Model<
  QuestionOptionAttributes,
  QuestionOptionCreationAttributes
> {
  @ForeignKey(() => QuizQuestion)
  @Column(DataType.INTEGER)
  questionId!: number;

  @BelongsTo(() => QuizQuestion)
  question!: QuizQuestion;

  @Column(DataType.STRING(200))
  option!: string;
}
