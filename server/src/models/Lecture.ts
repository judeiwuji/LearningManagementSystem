import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import ClassRoom from './ClassRoom';
import Lecturer from './Lecturer';
import { Optional } from 'sequelize';

export interface LectureAttributes {
  id: number;
  classRoomId: number;
  classRoom: ClassRoom;
  lecturerId: number;
  lecturer: Lecturer;
  meetingId: string;
  meetingLink: string;
  startDate: Date;
  endDate: Date;
  title: string;
}

export interface LectureCreationAttributes
  extends Optional<LectureAttributes, 'id' | 'classRoom' | 'lecturer'> {}

@Table
export default class Lecture extends Model<
  LectureAttributes,
  LectureCreationAttributes
> {
  @ForeignKey(() => ClassRoom)
  @Column(DataType.INTEGER)
  classRoomId!: number;

  @BelongsTo(() => ClassRoom)
  classRoom!: ClassRoom;

  @ForeignKey(() => Lecturer)
  @Column(DataType.INTEGER)
  lecturerId!: number;

  @BelongsTo(() => Lecturer)
  lecturer!: Lecturer;

  @Column({ type: DataType.STRING, allowNull: false })
  meetingId!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  meetingLink!: string;

  @Column({ type: DataType.DATE, allowNull: false })
  startDate!: string;

  @Column({ type: DataType.DATE, allowNull: false })
  endDate!: Date;

  @Column({ type: DataType.STRING(250), allowNull: false })
  title!: string;
}
