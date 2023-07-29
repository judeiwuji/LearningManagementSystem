import { Optional } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

export interface LevelAttributes {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface LevelCreationAttributes
  extends Optional<LevelAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

@Table
export default class Level extends Model<
  LevelAttributes,
  LevelCreationAttributes
> {
  @Column({ type: DataType.STRING(100), unique: true })
  name!: string;
}
