import User from '../models/User';
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
    const user = await User.findOne({ where: query });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }
}
