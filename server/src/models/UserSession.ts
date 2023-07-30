import { Optional, UUIDV4 } from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  IsUUID,
  Model,
  Table,
} from 'sequelize-typescript';
import User from './User';

export interface UserSessionAttributes {
  id: string;
  userId: number;
  user: User;
}

export interface UserSessionCreationAttributes
  extends Optional<UserSessionAttributes, 'id' | 'user'> {}

@Table
export default class UserSession extends Model<
  UserSessionAttributes,
  UserSessionCreationAttributes
> {
  @IsUUID('4')
  @Column({ type: DataType.STRING, defaultValue: UUIDV4(), primaryKey: true })
  id!: string;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}
