import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import User from './User';
import Level from './Level';
import Department from './Department';
import { Optional } from 'sequelize';

export interface StudentAttributes {
  id: number;
  userId: number;
  levelId: number;
  departmentId: number;
}

export interface StudentCreationAtttributes
  extends Optional<StudentAttributes, 'id'> {}

@Table
export default class Student extends Model<
  StudentAttributes,
  StudentCreationAtttributes
> {
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => Level)
  @Column(DataType.INTEGER)
  levelId!: number;

  @BelongsTo(() => Level)
  level!: Level;

  @ForeignKey(() => Department)
  @Column(DataType.INTEGER)
  departmentId!: number;

  @BelongsTo(() => Department)
  department!: Department;
}
