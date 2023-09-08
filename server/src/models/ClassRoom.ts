import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import Lecturer from './Lecturer';
import { Optional } from 'sequelize';
import { ClassRoomStatus } from './enums/ClassRoomStatus';
import ClassRoomStudent from './ClassRoomStudent';
import Quiz from './Quiz';

export interface ClassRoomAttributes {
  id: number;
  lecturerId: number;
  title: string;
  status: ClassRoomStatus;
}

export interface ClassRoomCreationAttributes
  extends Optional<ClassRoomAttributes, 'id' | 'status'> {}

@Table
export default class ClassRoom extends Model<
  ClassRoomAttributes,
  ClassRoomCreationAttributes
> {
  @ForeignKey(() => Lecturer)
  @Column(DataType.INTEGER)
  lecturerId!: number;

  @BelongsTo(() => Lecturer)
  lecturer!: Lecturer;

  @Column(DataType.STRING(200))
  title!: string;

  @Column({ type: DataType.INTEGER, defaultValue: ClassRoomStatus.CLOSE })
  status!: number;

  @HasMany(() => ClassRoomStudent)
  students!: ClassRoomStudent;

  @HasMany(() => Quiz)
  quizzes!: Quiz;
}
