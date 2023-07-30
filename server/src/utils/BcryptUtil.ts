import * as bcrypt from 'bcryptjs';

export default class BcryptUtil {
  static async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(password, salt);
  }
}
