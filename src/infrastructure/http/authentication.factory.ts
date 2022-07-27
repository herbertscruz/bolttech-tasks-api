import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { HttpRequest } from '../../application/common/http-request.interface';
import env from '../../configurations';
import debugPkg from 'debug';
import { pick } from 'lodash';
import moment from 'moment';
const debug = debugPkg(
  'bolttech:infrastructure:factory:common:authentication.factory',
);

export function authentication(
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token)
    return res.status(401).json({
      sucess: false,
      status: 401,
      message: env.ERROR.E006,
    });

  try {
    const decoded = jwt.verify(token, env.JWT.SECRET) as JwtPayload;

    const expiresIn = moment(decoded.createdAt).add(decoded.ttl, 'minutes');

    if (moment().isAfter(expiresIn)) {
      return res.status(401).json({
        sucess: false,
        status: 401,
        message: env.ERROR.E006,
      });
    }

    (req as HttpRequest).id = decoded.id;
    (req as HttpRequest).name = decoded.name;
    (req as HttpRequest).createdAt = decoded.createdAt;
    (req as HttpRequest).ttl = decoded.ttl;
    debug(pick(req, ['id', 'name', 'createdAt', 'ttl']));
    next();
  } catch (err) {
    debug(err);
    return res.status(401).json({
      sucess: false,
      status: 401,
      message: env.ERROR.E006,
    });
  }
}
