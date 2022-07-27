import { NextFunction, Request, RequestHandler, Response } from 'express';

export function createRequestHandler(
  callback: (req: Request, res: Response) => any,
): RequestHandler {
  return <RequestHandler>(
    async function (req: Request, res: Response, next: NextFunction) {
      try {
        await callback(req, res);
        next();
      } catch (err) {
        console.log(err);
        next(err);
      }
    }
  );
}
