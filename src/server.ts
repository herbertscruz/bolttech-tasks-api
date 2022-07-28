process.stdin.resume();

import debugPkg from 'debug';
import SwaggerControllerFactory from './infrastructure/common/swagger-controller.factory';
const debug = debugPkg('bolttech:server');
import typeormFactory from './infrastructure/database/typeorm.factory';
import TypeORMAdapter from './infrastructure/database/typeorm/typeorm.adapter';
import SmtpEmail from './infrastructure/email/smtp/smtp.adapter';
import HealthControllerFactory from './infrastructure/health/health-controller.factory';
import expressFactory from './infrastructure/http/express.factory';
import ExpressAdapter from './infrastructure/http/express/express.adapter';
import ProjectControllerFactory from './infrastructure/project/project-controller.factory';
import TaskControllerFactory from './infrastructure/task/task-controller.factory';
import TokenControllerFactory from './infrastructure/token/token-controller.factory';
import UserControllerFactory from './infrastructure/user/user-controller.factory';

process.env.TZ = 'UTC';
let datasource!: TypeORMAdapter;
let app!: ExpressAdapter;

(async () => {
  // ----------------------------------------------------------------
  // --- TypeORM
  // ----------------------------------------------------------------
  datasource = await typeormFactory();

  const emailService = new SmtpEmail();
  const tokenControllerFactory = new TokenControllerFactory(
    datasource,
    emailService,
  );

  const controllers = [
    new SwaggerControllerFactory(),
    new HealthControllerFactory(),
    tokenControllerFactory,
    new UserControllerFactory(datasource, tokenControllerFactory.controller),
    new ProjectControllerFactory(datasource, tokenControllerFactory.controller),
    new TaskControllerFactory(datasource, tokenControllerFactory.controller),
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
