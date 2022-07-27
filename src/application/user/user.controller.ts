import { Request, Response } from 'express';
import env from '../../configurations';
import ValidationError from '../../domain/common/validation-error.exception';
import IUserMeResponse from '../../domain/user/user-me-response.interface';
import User from '../../domain/user/user.entity';
import UserService from '../../domain/user/user.service';
import IController from '../common/controller.interface';
import { HttpRequest } from '../common/http-request.interface';

export default class UserController implements IController {
  constructor(private readonly userService: UserService) {}

  async getUserMe(
    req: HttpRequest,
    res: Response,
  ): Promise<Response<IUserMeResponse>> {
    const id = parseInt(req.id);
    const user = await this.userService.getSummaryData(id);
    return res.status(200).json(user);
  }

  async getUserFull(req: HttpRequest, res: Response): Promise<Response<User>> {
    const id = parseInt(req.id);
    const userId = parseInt(req.params.userId);
    if (id !== userId) throw new ValidationError(env.ERROR.E003);
    const user = await this.userService.getCompleteData(id);
    return res.status(200).json(user);
  }

  async createUser(req: Request, res: Response): Promise<Response<User>> {
    const user = await this.userService.createUser(req.body);
    return res.status(201).json(user);
  }

  async updateUser(req: HttpRequest, res: Response): Promise<Response<User>> {
    const id = parseInt(req.id);
    const userId = parseInt(req.params.userId);
    if (id !== userId) throw new ValidationError(env.ERROR.E004);
    const user = await this.userService.updateUser(id, req.body);
    return res.status(200).json(user);
  }

  async updatePassword(
    req: HttpRequest,
    res: Response,
  ): Promise<Response<IUserMeResponse>> {
    const id = parseInt(req.id);
    const userId = parseInt(req.params.userId);
    if (id !== userId) throw new ValidationError(env.ERROR.E005);
    const user = await this.userService.updateUserPassword(
      userId,
      req.body.newPassword,
    );
    return res.status(200).json(user);
  }
}
