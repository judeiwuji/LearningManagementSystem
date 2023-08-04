import { Op } from 'sequelize';
import UserDTO from '../models/DTOs/UserDTO';
import Pagination from '../models/Pagination';
import User from '../models/User';
import NotFoundError from '../models/errors/NotFoundError';
import LecturerDTO from '../models/DTOs/LecturerDTO';
import ClassRoom, {
  ClassRoomAttributes,
  ClassRoomCreationAttributes,
} from '../models/ClassRoom';
import LecturerService from './LecturerService';
import Lecturer from '../models/Lecturer';
import ClassRoomDTO from '../models/DTOs/ClassRoomDTO';
import StudentService from './StudentService';
import Student from '../models/Student';
import StudentDTO from '../models/DTOs/StudentDTO';

export default class ClassRoomService {
  private classRoomInclude() {
    return [
      {
        model: Lecturer,
        attributes: LecturerDTO,
        include: [{ model: User, attributes: UserDTO }],
      },
    ];
  }

  private lecturerService = new LecturerService();

  async createClassRoom(data: ClassRoomCreationAttributes, userId: number) {
    const lecturer = await this.lecturerService.findLecturerBy({ userId });
    const classRoom = await ClassRoom.create({
      lecturerId: lecturer.id,
      title: data.title,
    });
    return classRoom;
  }

  async findBy(query: any) {
    const classRoom = await ClassRoom.findOne({
      where: query,
      include: this.classRoomInclude(),
      attributes: ClassRoomDTO,
    });

    if (!classRoom) {
      throw new NotFoundError();
    }
    return classRoom;
  }

  async getClassRooms(page: number, userId: number, search?: string) {
    const pager = new Pagination(page);
    const lecturer = await this.lecturerService.findLecturerBy({ userId });
    const query: any = {
      lecturerId: lecturer.id,
    };

    if (search) {
      query[Op.or] = [
        {
          title: {
            [Op.like]: `%${search}%`,
          },
        },
      ];
    }

    const { rows, count } = await ClassRoom.findAndCountAll({
      limit: pager.pageSize,
      offset: pager.startIndex,
      include: this.classRoomInclude(),
      attributes: ClassRoomDTO,
      where: query,
    });

    return {
      page,
      results: rows,
      totalPages: pager.totalPages(count),
    };
  }

  async updateClassRoom(id: number, data: ClassRoomAttributes) {
    const classRoom = await this.findBy({ id });
    await classRoom.update({
      title: data.title,
      status: data.status,
    });
    return classRoom.reload();
  }

  async deleteClassRoom(id: number) {
    const classRoom = await this.findBy({ id });
    classRoom.destroy();
  }

  async getCount(userId: number) {
    const lecturer = await this.lecturerService.findLecturerBy({ userId });
    return ClassRoom.count({ where: { lecturerId: lecturer.id } });
  }
}
