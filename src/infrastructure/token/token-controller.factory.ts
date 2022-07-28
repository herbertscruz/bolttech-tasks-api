import { Router } from 'express';
import IDatabaseAdapter from '../../application/common/database-adapter.interface';
import IControllerFactory, {
  IRouterFactory,
} from '../common/controller-factory.interface';
import { createRequestHandler } from '../http/request-handler.factory';
import TokenController from '../../application/token/token.controller';
import TokenRepository from './token.repository';
import TokenService from '../../domain/token/token.service';
import UserRepository from '../user/user.repository';
import IEmail from '../../domain/common/email.interface';

export default class TokenControllerFactory
  implements IControllerFactory, IRouterFactory
{
  readonly controller: TokenController;

  constructor(database: IDatabaseAdapter, email: IEmail) {
    const tokenRepository = new TokenRepository(database);
    const userRepository = new UserRepository(database);
    const tokenService = new TokenService(
      tokenRepository,
      userRepository,
      email,
    );
    this.controller = new TokenController(tokenService);
  }

  getRoute(): Router {
    const router = Router();

    router.post(
      '/tokens/login',
      createRequestHandler((...params) => this.controller.login(...params)),
    );
    router.post(
      '/tokens/renew',
      createRequestHandler((...params) =>
        this.controller.renewPassword(...params),
      ),
    );

    return router;
  }
}
