import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import Lecturer from './Lecturer';
import { Optional } from 'sequelize';
import { ClassRoomStatus } from './enums/ClassRoomStatus';

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
}
