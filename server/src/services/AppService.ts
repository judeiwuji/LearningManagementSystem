import LevelDTO from '../models/DTOs/LevelDTO';
import Department from '../models/Department';
import Level from '../models/Level';
import User, { UserCreationAttributes } from '../models/User';
import { Roles } from '../models/enums/Roles';
import AppError from '../models/errors/AppError';
import BcryptUtil from '../utils/BcryptUtil';

export default class AppService {
  async install() {
    const user = await User.findOne({ where: { role: Roles.ADMIN } });
    if (user) {
      throw new AppError('App already installed');
    }

    const hashedPassword = await BcryptUtil.hashPassword(
      process.env.DEFAULT_APP_USER_PASSWORD as string
    );
    User.create({
      email: process.env.DEFAULT_APP_USER_EMAIL as string,
      password: hashedPassword,
      firstname: process.env.DEFAULT_APP_USER_FIRSTNAME as string,
      lastname: process.env.DEFAULT_APP_USER_LASTNAME as string,
      role: Roles.ADMIN,
    });
    Level.bulkCreate([
      { name: 'nd1' },
      { name: 'nd2' },
      { name: 'hnd1' },
      { name: 'hnd2' },
    ]);

    Department.bulkCreate([
      { name: 'computer science technology' },
      { name: 'food science technology' },
      { name: 'maths and statistics' },
      { name: 'science and laboratory technology' },
    ]);
  }

  async getLevels() {
    return Level.findAll({ attributes: LevelDTO });
  }
}
