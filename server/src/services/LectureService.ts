import { Op } from 'sequelize';
import UserDTO from '../models/DTOs/UserDTO';
import Pagination from '../models/Pagination';
import User from '../models/User';
import NotFoundError from '../models/errors/NotFoundError';
import Lecture, {
  LectureAttributes,
  LectureCreationAttributes,
} from '../models/Lecture';
import LecturerService from './LecturerService';
import Lecturer from '../models/Lecturer';
import LecturerDTO from '../models/DTOs/LecturerDTO';
import LectureDTO from '../models/DTOs/LectureDTO';
import MeetingService from './MeetingService';

export default class LectureService {
  private lectureInclude(query: any = {}) {
    return [
      {
        model: Lecturer,
        attributes: LecturerDTO,
        include: [{ model: User, attributes: UserDTO, where: query }],
      },
    ];
  }
  private lecturerService = new LecturerService();
  private meetingService = new MeetingService();

  async createLecture(
    data: LectureCreationAttributes,
    userId: number,
    classRoomId: number
  ) {
    const lecturer = await this.lecturerService.findLecturerBy({ userId });
    const meeting = await this.meetingService.createMeeting();

    const lecture = await Lecture.create(
      {
        classRoomId,
        meetingId: meeting.id,
        meetingLink: meeting.friendly_url,
        endDate: new Date(data.endDate),
        startDate: new Date(data.startDate),
        lecturerId: lecturer.id,
        title: data.title,
      },
      { include: this.lectureInclude() }
    );
    return lecture;
  }

  async findBy(query: any) {
    const lecture = await Lecture.findOne({
      where: query,
      include: this.lectureInclude(),
      attributes: LectureDTO,
    });

    if (!lecture) {
      throw new NotFoundError();
    }
    return lecture;
  }

  async getLectures(classRoomId: number, page: number, search?: string) {
    const pager = new Pagination(page);
    const query: any = { classRoomId };
    if (search) {
      query['title'] = {
        [Op.like]: `%${search}%`,
      };
    }

    const { rows, count } = await Lecture.findAndCountAll({
      limit: pager.pageSize,
      offset: pager.startIndex,
      include: this.lectureInclude(),
      attributes: LectureDTO,
      where: query,
    });

    return {
      page,
      results: rows,
      totalPages: pager.totalPages(count),
    };
  }

  async updateLecture(id: number, data: LectureAttributes, userId: number) {
    const lecturer = await this.lecturerService.findLecturerBy({ userId });
    const lecture = await this.findBy({ id, lecturerId: lecturer.id });
    await lecture.update({
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      endDate: data.endDate ? new Date(data.endDate) : undefined,
      title: data.title,
    });
    return lecture.reload();
  }

  async deleteLecture(id: number, userId: number) {
    const lecturer = await this.lecturerService.findLecturerBy({ userId });
    const lecture = await this.findBy({ id, lecturerId: lecturer.id });
    lecture.destroy();
  }
}
