import { Request } from 'express';

export interface HttpRequest extends Request {
  id: string;
  name: string;
  createdAt: Date;
  ttl: number;
}
