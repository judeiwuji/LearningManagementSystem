import { sign, verify } from 'jsonwebtoken';

export class JWTUtil {
  sign(payload: any) {
    return sign(payload, '');
  }
}
