import BaseError from './BaseError';

export default class AuthError extends BaseError {
  code = 401;

  constructor(message?: string) {
    message = message || 'Authentication failed';
    super(message);
  }
}
