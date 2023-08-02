import DepartmentDTO from '../models/DTOs/DepartmentDTO';
import LecturerDTO from '../models/DTOs/LecturerDTO';
import LevelDTO from '../models/DTOs/LevelDTO';
import StudentDTO from '../models/DTOs/StudentDTO';
import UserDTO from '../models/DTOs/UserDTO';
import Department from '../models/Department';
import Lecturer, { LecturerAttributes } from '../models/Lecturer';
import Level from '../models/Level';
import Student, { StudentAttributes } from '../models/Student';
import User, { UserAttributes } from '../models/User';
import NotFoundError from '../models/errors/NotFoundError';
import ChangePasswordRequest from '../models/interfaces/ChangePasswordRequest';
import BcryptUtil from '../utils/BcryptUtil';

export default class UserService {
  async changePassword(request: ChangePasswordRequest, userId: number) {
    const user = await this.findBy({ id: userId });
    const hashedPassword = await BcryptUtil.hashPassword(request.password);

    await user.update({ password: hashedPassword });
  }

  async findBy(query: any = {}) {
    const user = await User.findOne({
      where: query,
      include: [
        {
          model: Lecturer,
          attributes: LecturerDTO,
          include: [{ model: Department, attributes: DepartmentDTO }],
        },
        {
          model: Student,
          attributes: StudentDTO,
          include: [
            { model: Department, attributes: DepartmentDTO },
            { model: Level, attributes: LevelDTO },
          ],
        },
      ],
      attributes: UserDTO,
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async updateUser(
    data: UserAttributes & StudentAttributes & LecturerAttributes,
    id: number
  ) {
    const user = await this.findBy({ id });

    await user.update({ firstname: data.firstname, lastname: data.lastname });

    if (user.student) {
      await user.student.update({
        departmentId: data.departmentId,
        levelId: data.levelId,
      });
    }

    if (user.lecturer) {
      await user.lecturer.update({
        departmentId: data.departmentId,
      });
    }
    return user.reload();
  }
}
