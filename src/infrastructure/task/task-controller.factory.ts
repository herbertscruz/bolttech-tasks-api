import { Router } from 'express';
import IDatabaseAdapter from '../../application/common/database-adapter.interface';
import TaskController from '../../application/task/task.controller';
import TaskService from '../../domain/task/task.service';
import { authentication } from '../http/authentication.factory';
import IControllerFactory, {
  IRouterFactory,
} from '../common/controller-factory.interface';
import TaskRepository from './task.repository';
import { createRequestHandler } from '../http/request-handler.factory';
import TokenController from '../../application/token/token.controller';
import ProjectRepository from '../project/project.repository';

export default class TaskControllerFactory
  implements IControllerFactory, IRouterFactory
{
  private controller: TaskController;
  private tokenController: TokenController;

  constructor(database: IDatabaseAdapter, tokenController: TokenController) {
    this.tokenController = tokenController;
    const taskRepository = new TaskRepository(database);
    const projectRepository = new ProjectRepository(database);
    const taskService = new TaskService(taskRepository, projectRepository);
    this.controller = new TaskController(taskService);
  }

  getRoute(): Router {
    const router = Router();

    router.get(
      '/projects/:projectId/tasks',
      authentication(this.tokenController),
      createRequestHandler((...params) =>
        this.controller.getAllByProject(...params),
      ),
    );
    router.post(
      '/tasks',
      authentication(this.tokenController),
      createRequestHandler((...params) => this.controller.saveTask(...params)),
    );
    router.delete(
      '/tasks/:taskId',
      authentication(this.tokenController),
      createRequestHandler((...params) =>
        this.controller.deleteTask(...params),
      ),
    );

    return router;
  }
}
