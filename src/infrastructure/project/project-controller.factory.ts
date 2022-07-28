import { Router } from 'express';
import IDatabaseAdapter from '../../application/common/database-adapter.interface';
import ProjectController from '../../application/project/project.controller';
import ProjectService from '../../domain/project/project.service';
import { authentication } from '../http/authentication.factory';
import IControllerFactory, {
  IRouterFactory,
} from '../common/controller-factory.interface';
import ProjectRepository from './project.repository';
import { createRequestHandler } from '../http/request-handler.factory';
import TokenController from '../../application/token/token.controller';

export default class ProjectControllerFactory
  implements IControllerFactory, IRouterFactory
{
  private controller: ProjectController;
  private tokenController: TokenController;

  constructor(database: IDatabaseAdapter, tokenController: TokenController) {
    this.tokenController = tokenController;
    const projectRepository = new ProjectRepository(database);
    const projectService = new ProjectService(projectRepository);
    this.controller = new ProjectController(projectService);
  }

  getRoute(): Router {
    const router = Router();

    router.get(
      '/users/:userId/projects',
      authentication(this.tokenController),
      createRequestHandler((...params) =>
        this.controller.getAllByUser(...params),
      ),
    );
    router.post(
      '/projects',
      authentication(this.tokenController),
      createRequestHandler((...params) =>
        this.controller.saveProject(...params),
      ),
    );
    router.delete(
      '/projects/:projectId',
      authentication(this.tokenController),
      createRequestHandler((...params) =>
        this.controller.deleteProjectAndTasks(...params),
      ),
    );

    return router;
  }
}
