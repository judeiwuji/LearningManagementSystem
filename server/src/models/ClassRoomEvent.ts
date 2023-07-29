import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import ClassRoom from './ClassRoom';
import User from './User';
import { Optional } from 'sequelize';

export interface ClassRoomEventAttributes {
  id: number;
  classRoomId: number;
  classRoom: ClassRoom;
  userId: number;
  user: User;
  description: string;
  link: string;
  eventDate: Date;
}

export interface ClassRoomEventCreationAttributes
  extends Optional<ClassRoomEventAttributes, 'id' | 'classRoom' | 'user'> {}

@Table
export default class ClassRoomEvent extends Model<
  ClassRoomEventAttributes,
  ClassRoomEventCreationAttributes
> {
  @ForeignKey(() => ClassRoom)
  @Column(DataType.INTEGER)
  classRoomId!: number;

  @BelongsTo(() => ClassRoom)
  classRoom!: ClassRoom;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number;

  @BelongsTo(() => User)
  user!: ClassRoom;

  @Column({ type: DataType.STRING(300), allowNull: false })
  description!: string;

  @Column({ type: DataType.STRING(300), allowNull: false })
  link!: string;

  @Column({ type: DataType.DATE, allowNull: false })
  eventDate!: Date;
}
