import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import Quiz from './Quiz';
import { Optional } from 'sequelize';
import QuestionOption from './QuestionOption';

export interface QuizQuestionAttributes {
  id: number;
  quizId: number;
  quiz: Quiz;
  question: string;
  answer: string;
  options: QuestionOption[] | string[];
}

export interface QuizQuestionCreationAttributes
  extends Optional<QuizQuestionAttributes, 'id' | 'quiz' | 'options'> {}

@Table
export default class QuizQuestion extends Model<
  QuizQuestionAttributes,
  QuizQuestionCreationAttributes
> {
  @ForeignKey(() => Quiz)
  @Column(DataType.INTEGER)
  quizId!: number;

  @BelongsTo(() => Quiz)
  quiz!: Quiz;

  @Column({ type: DataType.STRING(300) })
  question!: string;

  @Column({ type: DataType.STRING(250) })
  answer!: string;

  @HasMany(() => QuestionOption)
  options!: QuestionOption[];
}
