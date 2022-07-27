import IControllerFactory from '../common/controller-factory.interface';
import ExpressAdapter from './express/express.adapter';
import { ExpressOptions } from './express/express.config';

export default async function expressFactory(
  controllers: IControllerFactory[],
): Promise<ExpressAdapter> {
  const routers = controllers.map((controller: any) => {
    if (controller?.getRoute) {
      return controller.getRoute();
    }
  });

  const app = new ExpressAdapter(Object.assign(ExpressOptions, { routers }));
  await app.start();
  return app;
}
