import express, { Router } from 'express';
import HealthController from '../../application/health/health.controller';
import IControllerFactory, {
  IRouterFactory,
} from '../common/controller-factory.interface';
import { createRequestHandler } from '../http/request-handler.factory';

export default class HealthControllerFactory
  implements IControllerFactory, IRouterFactory
{
  private controller: HealthController;

  constructor() {
    this.controller = new HealthController();
  }

  getRoute(): Router {
    const router = express.Router();

    router.get(
      '/',
      createRequestHandler((...params) =>
        this.controller.serverStatus(...params),
      ),
    );
    router.get(
      '/health',
      createRequestHandler((...params) =>
        this.controller.serverStatus(...params),
      ),
    );

    return router;
  }
}
