import jwt from 'jsonwebtoken';
import env from '../src/configurations/';
import debugPkg from 'debug';
const debug = debugPkg('bolttech:script:generate:token');
import { AppDataSource } from '../src/infrastructure/database/typeorm/datasource.config';
import UserModel from '../src/infrastructure/database/typeorm/entities/user.model';
import { first, pick } from 'lodash';

AppDataSource.initialize()
  .then(async () => {
    const user = await AppDataSource.manager.find(UserModel, {
      order: { id: 1 },
      take: 1,
    });

    if (user.length === 0) throw new Error('User not found');

    const data = {
      ...pick(first(user), ['id', 'name']),
      createdAt: new Date(),
      ttl: env.JWT.TTL_MINUTES,
    };

    const token = jwt.sign(data, env.JWT.SECRET);

    debug('Data: %s', data);
    debug('Token: %s', token);
  })
  .catch(debug)
  .finally(() => process.exit());
