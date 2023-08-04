import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import Student from './Student';
import Quiz from './Quiz';
import { Optional } from 'sequelize';

export interface QuizResultAttributes {
  id: number;
  studentId: number;
  student: Student;
  quizId: number;
  quiz: Quiz;
  score: number;
  questionCount: number;
}

export interface QuizResultCreationAttributes
  extends Optional<QuizResultAttributes, 'id' | 'student' | 'quiz'> {}

@Table
export default class QuizResult extends Model<
  QuizResultAttributes,
  QuizResultCreationAttributes
> {
  @ForeignKey(() => Student)
  studentId!: number;

  @BelongsTo(() => Student)
  student!: Student;

  @ForeignKey(() => Quiz)
  quizId!: number;

  @BelongsTo(() => Quiz)
  quiz!: Quiz;

  @Column({ type: DataType.INTEGER, allowNull: false })
  score!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  questionCount!: number;
}
