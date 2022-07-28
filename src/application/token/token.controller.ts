import { Request, Response } from 'express';
import Token from '../../domain/token/token.entity';
import TokenService from '../../domain/token/token.service';
import IController from '../common/controller.interface';

export default class TokenController implements IController {
  constructor(private readonly tokenService: TokenService) {}

  async getByToken(token: string): Promise<Token | null> {
    return this.tokenService.getByToken(token);
  }

  async login(req: Request, res: Response): Promise<Response<Token>> {
    const token = await this.tokenService.createTokenByLogin(
      req.body.email,
      req.body.password,
    );
    return res.status(200).json(token);
  }

  async renewPassword(req: Request, res: Response): Promise<Response<void>> {
    const email = req.body.email;
    await this.tokenService.renewPassword(email);
    return res.status(204).send();
  }
}
