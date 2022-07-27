import express, {
  Application,
  ErrorRequestHandler,
  RequestHandler,
  Router,
} from 'express';
import { Server } from 'http';
import IHttp from '../http.interface';
import debugPkg from 'debug';
const debug = debugPkg('bolttech:infrastructure:http:express:express:adapter');

export interface IExpressAdapterOptions {
  port: number;
  beforeMiddlewares?: RequestHandler[];
  routers: Router[];
  afterMiddlewares?: RequestHandler[];
  errorHandlers?: ErrorRequestHandler[];
}

export default class ExpressAdapter implements IHttp {
  private app: Application;
  private server!: Server;

  constructor(private readonly appInit: IExpressAdapterOptions) {
    this.app = express();
    this.middlewares(appInit.beforeMiddlewares);
    this.routes(appInit.routers);
    this.middlewares(appInit.afterMiddlewares);
    this.errorHandlers(appInit.errorHandlers);
  }

  private middlewares(middleWares: RequestHandler[] = []) {
    middleWares.forEach((middleWare) => this.app.use(middleWare));
  }

  private routes(routers: Router[]) {
    routers.forEach((router) => this.app.use(router));
  }

  private errorHandlers(errorHandlers: ErrorRequestHandler[] = []) {
    errorHandlers.forEach((errorHandler) => this.app.use(errorHandler));
  }

  async start(port?: number): Promise<Server> {
    port = port ?? this.appInit.port;
    return (this.server = this.app.listen(port, () => {
      debug(`App listening on the http://localhost:${port}`);
    }));
  }

  async close(): Promise<void> {
    this.server?.close();
  }

  getServer(): Server {
    return this.server;
  }
}
