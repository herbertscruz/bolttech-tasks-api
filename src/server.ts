process.stdin.resume();

import debugPkg from 'debug';
import SwaggerControllerFactory from './infrastructure/common/swagger-controller.factory';
const debug = debugPkg('bolttech:server');
import typeormFactory from './infrastructure/database/typeorm.factory';
import TypeORMAdapter from './infrastructure/database/typeorm/typeorm.adapter';
import HealthControllerFactory from './infrastructure/health/health-controller.factory';
import expressFactory from './infrastructure/http/express.factory';
import ExpressAdapter from './infrastructure/http/express/express.adapter';
import UserControllerFactory from './infrastructure/user/user-controller.factory';

process.env.TZ = 'UTC';
let datasource!: TypeORMAdapter;
let app!: ExpressAdapter;

(async () => {
  // ----------------------------------------------------------------
  // --- TypeORM
  // ----------------------------------------------------------------
  datasource = await typeormFactory();

  const controllers = [
    new SwaggerControllerFactory(),
    new HealthControllerFactory(),
    new UserControllerFactory(datasource),
  ];

  // ----------------------------------------------------------------
  // --- Http Server
  // ----------------------------------------------------------------
  app = await expressFactory(controllers);
})();

// ---------------------------------------------------------------------------------
// --- Closing events ---
// ---------------------------------------------------------------------------------
process.on('exit', async function () {
  await Promise.all([datasource?.close(), app?.close()]);
  debug('--------------------------------------------------');
  debug('Application stopped');
});
process.on('SIGINT', process.exit);
process.on('SIGUSR1', process.exit);
process.on('SIGUSR2', process.exit);
process.on('uncaughtException', function (err) {
  debug(err);
  process.exit();
});
