import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import User from './User';
import Department from './Department';
import { Optional } from 'sequelize';

export interface LecturerAttributes {
  id: number;
  userId: number;
  departmentId: number;
}

export interface LecturerCreationAtttributes
  extends Optional<LecturerAttributes, 'id'> {}

@Table
export default class Lecturer extends Model<
  LecturerAttributes,
  LecturerCreationAtttributes
> {
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => Department)
  @Column(DataType.INTEGER)
  departmentId!: number;

  @BelongsTo(() => Department)
  department!: Department;
}
