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

export interface ClassRoomAttributes {
  id: number;
  lecturerId: number;
  title: string;
}

export interface ClassRoomCreationAttributes
  extends Optional<ClassRoomAttributes, 'id'> {}

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
}
