import express, { Request, Response, Router } from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import { readFileSync } from 'fs';
import * as YAML from 'js-yaml';
import * as path from 'path';
import * as swaggerUI from 'swagger-ui-express';
import IControllerFactory, {
  IRouterFactory,
} from './controller-factory.interface';

export default class SwaggerControllerFactory
  implements IControllerFactory, IRouterFactory
{
  getRoute(): Router {
    const router = express.Router();

    const pathYamlFile = path.join(
      process.cwd(),
      'src',
      'configurations',
      'open-api.yaml',
    );

    function loadDocumentSync(file: string): any {
      return YAML.load(readFileSync(file, 'utf8'));
    }

    const swaggerDoc = loadDocumentSync(pathYamlFile.toString());
    router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
    router.get('/api-contract', (req: Request, res: Response) => {
      res.send(swaggerDoc);
    });
    router.use(
      OpenApiValidator.middleware({
        apiSpec: pathYamlFile.toString(),
        validateRequests: true,
        validateResponses: true,
      }),
    );

    return router;
  }
}
