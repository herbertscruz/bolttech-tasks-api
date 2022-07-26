import { NextFunction, Request, RequestHandler, Response } from 'express';
import debugPkg from 'debug';
const debug = debugPkg('bolttech:infrastructure:http:request:handler:factory');

export function createRequestHandler(
  callback: (req: Request, res: Response) => any,
): RequestHandler {
  return <RequestHandler>(
    async function (req: Request, res: Response, next: NextFunction) {
      try {
        await callback(req, res);
      } catch (err) {
        debug(err);
        next(err);
      }
    }
  );
}
