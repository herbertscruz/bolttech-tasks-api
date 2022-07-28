import debugPkg from 'debug';
const debug = debugPkg('bolttech:script:generate:token');
import { AppDataSource } from '../src/infrastructure/database/typeorm/datasource.config';
import UserModel from '../src/infrastructure/database/typeorm/entities/user.model';
import { first } from 'lodash';
import Token from '../src/domain/token/token.entity';
import TokenModel from '../src/infrastructure/database/typeorm/entities/token.model';

AppDataSource.initialize()
  .then(async () => {
    const user = first(
      await AppDataSource.manager.find(UserModel, {
        order: { id: 1 },
        take: 1,
      }),
    );

    if (!user) throw new Error('User not found');

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const token = new Token({ userId: user.id! });
    token.generate(user);

    await AppDataSource.manager.insert(TokenModel, token);

    debug('Token: %s', token);
  })
  .catch(debug)
  .finally(() => process.exit());
