import jwt from 'jsonwebtoken';
import env from '../src/configurations/';
import debugPkg from 'debug';
const debug = debugPkg('bolttech:script:ganerate:token');
import { AppDataSource } from '../src/infrastructure/database/typeorm/datasource.config';
import UserModel from '../src/infrastructure/database/typeorm/entities/user.model';
import { pick } from 'lodash';

AppDataSource.initialize()
  .then(async () => {
    const user = await AppDataSource.manager.findOne(UserModel, {
      where: { id: 1 },
    });
    const token = jwt.sign(
      pick(user, ['id', 'name', 'createdAt']),
      env.API.JWT_SECRET,
    );
    debug('Username: %s', user?.name);
    debug('Token: %s', token);
  })
  .catch(debug)
  .finally(() => process.exit());
