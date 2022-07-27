import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

export function errorHandler(): ErrorRequestHandler {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  return <ErrorRequestHandler>(
    function (err, req: Request, res: Response, next: NextFunction) {
      const result = {
        success: false,
        status: err.status || 500,
        message: err.message,
      } as any;

      if (!['prod', 'production'].includes(process.env.NODE_ENV || '')) {
        result.errors = err.errors;
      }

      res.status(result.status);
      res.json(result);
      next(err);
    }
  );
}
