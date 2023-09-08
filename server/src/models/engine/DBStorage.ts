import { Sequelize } from 'sequelize-typescript';
import * as mysql from 'mysql2';
import * as dotenv from 'dotenv';
import User from '../User';
import Department from '../Department';
import Level from '../Level';
import Lecturer from '../Lecturer';
import Student from '../Student';
import ClassRoom from '../ClassRoom';
import ClassRoomStudent from '../ClassRoomStudent';
import Quiz from '../Quiz';
import QuizQuestion from '../QuizQuestion';
import QuestionOption from '../QuestionOption';
import QuestionAnswer from '../QuestionAnswer';
import UserSession from '../UserSession';
import QuizResult from '../QuizResult';
dotenv.config();

const DB = new Sequelize({
  database: process.env['DB_NAME'],
  host: process.env['DB_HOST'],
  password: process.env['DB_PASS'],
  username: process.env['DB_USER'],
  dialect: 'mysql',
  dialectModule: mysql,
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    paranoid: true,
    timestamps: true,
  },
  timezone: '+01:00',
  models: [
    Department,
    Level,
    User,
    Lecturer,
    Student,
    ClassRoom,
    ClassRoomStudent,
    Quiz,
    QuizResult,
    QuizQuestion,
    QuestionOption,
    QuestionAnswer,
    UserSession,
  ],
  logging: false,
});

Quiz.belongsTo(ClassRoomStudent, {
  foreignKey: 'classRoomId',
  as: 'classRoomStudent',
});

export default DB;
