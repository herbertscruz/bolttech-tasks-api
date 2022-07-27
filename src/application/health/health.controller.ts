import { Request, Response } from 'express';
import IController from '../common/controller.interface';

export default class HealthController implements IController {
  async serverStatus(req: Request, res: Response) {
    const data = {
      uptime: process.uptime(),
      message: 'Server Up!',
      date: new Date().getTime(),
    };

    return res.status(200).send(data);
  }
}
