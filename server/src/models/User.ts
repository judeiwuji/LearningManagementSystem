import { Optional } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

export interface UserAttributes {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  avatar: string;
  role: number;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, 'id' | 'avatar'> {}

@Table
export default class User extends Model<
  UserAttributes,
  UserCreationAttributes
> {
  @Column({ type: DataType.STRING(40), allowNull: false })
  firstname!: string;

  @Column({ type: DataType.STRING(40), allowNull: false })
  lastname!: string;

  @Column({ type: DataType.STRING(60), unique: true, allowNull: false })
  email!: string;

  @Column({ type: DataType.CHAR(60), allowNull: false })
  password!: string;

  @Column({ type: DataType.STRING(300), defaultValue: '/imgs/avatar.png' })
  avatar!: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  role!: number;
}
