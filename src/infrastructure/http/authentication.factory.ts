import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { HttpRequest } from '../../application/common/http-request.interface';
import env from '../../configurations';
import debugPkg from 'debug';
import { pick } from 'lodash';
import TokenController from '../../application/token/token.controller';
const debug = debugPkg(
  'bolttech:infrastructure:factory:http:authentication.factory',
);

export const authentication =
  (tokenController: TokenController) =>
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) throw new Error('Token not found');

      const tokenObj = await tokenController.getByToken(token);
      if (tokenObj === null) throw new Error('Token not found');
      if (tokenObj?.isExpired()) throw new Error('Token expired');

      const decoded = jwt.verify(token, env.JWT.SECRET) as JwtPayload;
      (req as HttpRequest).id = decoded.id;
      (req as HttpRequest).name = decoded.name;
      (req as HttpRequest).createdAt = decoded.createdAt;
      (req as HttpRequest).ttl = decoded.ttl;

      debug(pick(req, ['id', 'name', 'createdAt', 'ttl']));
      next();
    } catch (err) {
      debug(err);
      res.status(401).json({
        sucess: false,
        status: 401,
        message: env.ERROR.E006,
      });
      next(err);
    }
  };
