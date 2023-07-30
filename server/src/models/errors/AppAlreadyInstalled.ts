import BaseError from './BaseError';

export default class AppAlreadyInstalled extends BaseError {
  code = 400;
  constructor(message?: string) {
    message = message || 'App is already installed';
    super(message);
  }
}
