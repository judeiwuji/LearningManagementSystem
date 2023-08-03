import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import ClassRoom from './ClassRoom';
import Lecturer from './Lecturer';

export interface QuizAttributes {
  id: number;
  classRoomId: number;
  classRoom: ClassRoom;
  lecturerId: number;
  lecturer: Lecturer;
  title: string;
  duration: number;
  status: number;
}

export interface QuizCreationAttributes
  extends Optional<QuizAttributes, 'id' | 'classRoom' | 'lecturer'> {}

@Table
export default class Quiz extends Model<
  QuizAttributes,
  QuizCreationAttributes
> {
  @ForeignKey(() => ClassRoom)
  @Column(DataType.INTEGER)
  classRoomId!: number;

  @BelongsTo(() => ClassRoom)
  classRoom!: ClassRoom;

  @ForeignKey(() => Lecturer)
  @Column(DataType.INTEGER)
  lecturerId!: number;

  @BelongsTo(() => Lecturer)
  lecturer!: Lecturer;

  @Column({ type: DataType.STRING, allowNull: false })
  title!: string;

  @Column({ type: DataType.INTEGER, defaultValue: 30 })
  duration!: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  status!: number;
}
