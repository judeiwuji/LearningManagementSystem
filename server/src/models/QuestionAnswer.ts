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
import Quiz from './Quiz';

export interface QuestionAnswerAttributes {
  id: number;
  quizId: number;
  quiz: Quiz;
  questionId: number;
  question: QuizQuestion;
  studentId: number;
  student: Student;
  answer: string;
  score: number;
}

export interface QuestionAnswerCreationAttributes
  extends Optional<
    QuestionAnswerAttributes,
    'id' | 'quiz' | 'question' | 'student'
  > {}

@Table
export default class QuestionAnswer extends Model<
  QuestionAnswerAttributes,
  QuestionAnswerCreationAttributes
> {
  @ForeignKey(() => Quiz)
  @Column(DataType.INTEGER)
  quizId!: number;

  @BelongsTo(() => Quiz)
  quiz!: Quiz;

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

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  score!: string;
}
