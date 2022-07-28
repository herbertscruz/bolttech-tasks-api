import { Router } from 'express';
import IDatabaseAdapter from '../../application/common/database-adapter.interface';
import UserController from '../../application/user/user.controller';
import UserService from '../../domain/user/user.service';
import { authentication } from '../http/authentication.factory';
import IControllerFactory, {
  IRouterFactory,
} from '../common/controller-factory.interface';
import UserRepository from './user.repository';
import { createRequestHandler } from '../http/request-handler.factory';
import TokenController from '../../application/token/token.controller';

export default class UserControllerFactory
  implements IControllerFactory, IRouterFactory
{
  private controller: UserController;
  private tokenController: TokenController;

  constructor(database: IDatabaseAdapter, tokenController: TokenController) {
    this.tokenController = tokenController;
    const userRepository = new UserRepository(database);
    const userService = new UserService(userRepository);
    this.controller = new UserController(userService);
  }

  getRoute(): Router {
    const router = Router();

    router.get(
      '/users/me',
      authentication(this.tokenController),
      createRequestHandler((...params) => this.controller.getUserMe(...params)),
    );
    router.get(
      '/users/:userId',
      authentication(this.tokenController),
      createRequestHandler((...params) =>
        this.controller.getUserFull(...params),
      ),
    );
    router.post(
      '/users',
      createRequestHandler((...params) =>
        this.controller.createUser(...params),
      ),
    );
    router.put(
      '/users/:userId',
      authentication(this.tokenController),
      createRequestHandler((...params) =>
        this.controller.updateUser(...params),
      ),
    );
    router.patch(
      '/users/:userId/new-password',
      authentication(this.tokenController),
      createRequestHandler((...params) =>
        this.controller.updatePassword(...params),
      ),
    );

    return router;
  }
}
