import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import Student from './Student';
import ClassRoom from './ClassRoom';

export interface ClassRoomStudentAttributes {
  id: number;
  classRoomId: number;
  classRoom: ClassRoom;
  studentId: number;
  student: Student;
}

export interface ClassRoomStudentCreationAttributes
  extends Optional<
    ClassRoomStudentAttributes,
    'id' | 'classRoom' | 'student'
  > {}

@Table
export default class ClassRoomStudent extends Model<
  ClassRoomStudentAttributes,
  ClassRoomStudentCreationAttributes
> {
  @ForeignKey(() => ClassRoom)
  @Column(DataType.INTEGER)
  classRoomId!: number;

  @BelongsTo(() => ClassRoom)
  classRoom!: ClassRoom;

  @ForeignKey(() => Student)
  @Column(DataType.INTEGER)
  studentId!: number;

  @BelongsTo(() => Student)
  student!: Student;
}
