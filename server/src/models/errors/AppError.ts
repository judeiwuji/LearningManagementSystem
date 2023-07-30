import BaseError from './BaseError';

export default class AppError extends BaseError {
  code = 400;
  constructor(message?: string) {
    message = message || 'App failed';
    super(message);
  }
}
