import BaseError from './BaseError';

export default class NotFoundError extends BaseError {
  code = 404;
  constructor(message?: string) {
    message = message || 'Not found';
    super(message);
  }
}
