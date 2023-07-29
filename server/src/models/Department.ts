import { Optional } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

export interface DepartmentAttributes {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface DepartmentCreationAttributes
  extends Optional<DepartmentAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

@Table
export default class Department extends Model<
  DepartmentAttributes,
  DepartmentCreationAttributes
> {
  @Column({ type: DataType.STRING(200), unique: true })
  name!: string;
}
