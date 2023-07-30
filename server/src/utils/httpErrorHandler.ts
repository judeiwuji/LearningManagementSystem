import { Response } from 'express';

export default function httpErrorHandler(error: any, res: Response) {
  const code = error.code || 400;
  res.status(code).send({ error: error.message });
}
