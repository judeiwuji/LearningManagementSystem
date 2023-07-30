import UserDTO from '../models/DTOs/UserDTO';
import User from '../models/User';
import UserSession from '../models/UserSession';
import { AuthRequest } from '../models/auth/AuthRequest';
import AuthError from '../models/errors/AuthError';
import BcryptUtil from '../utils/BcryptUtil';

export default class AuthService {
  async login(data: AuthRequest) {
    const user = await User.findOne({ where: { email: data.email } });

    if (!user) {
      throw new AuthError('Wrong email and password combination');
    }

    const isMatch = await BcryptUtil.comparePassword(
      data.password,
      user.password
    );
    if (!isMatch) {
      throw new AuthError('Wrong email and password combination');
    }

    return this.createSession(user.id);
  }

  private async createSession(userId: number) {
    const session = await UserSession.create({ userId });
    return session.id;
  }

  private async findUserSessionBy(query: any) {
    const userSession = await UserSession.findOne({
      where: query,
      include: [{ model: User, attributes: UserDTO }],
    });

    if (!userSession) {
      throw new AuthError('Session does not exists');
    }
    return userSession;
  }

  async getUserFromSession(session: string) {
    const userSession = await this.findUserSessionBy({ id: session });
    return userSession.user;
  }

  async logout(session: string) {
    if (!session) {
      throw new AuthError('Session is required');
    }
    const userSession = await this.findUserSessionBy({ id: session });
    userSession.destroy();
  }
}
