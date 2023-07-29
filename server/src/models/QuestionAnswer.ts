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
import Student from './Student';

export interface QuestionAnswerAttributes {
  id: number;
  questionId: number;
  question: QuizQuestion;
  studentId: number;
  student: Student;
  option: string;
}

export interface QuestionAnswerCreationAttributes
  extends Optional<QuestionAnswerAttributes, 'id' | 'question'> {}

@Table
export default class QuestionAnswer extends Model<
  QuestionAnswerAttributes,
  QuestionAnswerCreationAttributes
> {
  @ForeignKey(() => QuizQuestion)
  @Column(DataType.INTEGER)
  questionId!: number;

  @BelongsTo(() => QuizQuestion)
  question!: QuizQuestion;

  @ForeignKey(() => Student)
  @Column(DataType.INTEGER)
  studentId!: number;

  @BelongsTo(() => Student)
  student!: Student;

  @Column(DataType.STRING(200))
  answer!: string;
}
