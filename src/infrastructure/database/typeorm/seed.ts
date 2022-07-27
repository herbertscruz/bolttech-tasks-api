import { AppDataSource } from './datasource.config';
import debugPkg from 'debug';
import UserModel from './entities/user.model';
const debug = debugPkg('bolttech:infrastructure:database:typeorm:seed');
import CryptoJS from 'crypto-js';
import env from '../../../configurations';

AppDataSource.initialize()
  .then(async () => {
    debug('Seeding data in the database...');

    let users = await AppDataSource.manager.find(UserModel);

    if (users.length === 0) {
      users = [
        {
          name: 'John Wick',
          email: 'johnwick@bolttech.com',
          password: CryptoJS.AES.encrypt(
            'Beloveddog2014',
            env.API.CRYPTO_SECRET,
          ).toString(),
        },
      ].map((b: any) => new UserModel().toModel(b));

      const result = await AppDataSource.manager.insert(UserModel, users);
      debug('%s new balances saved', result.identifiers.length);
    } else {
      debug('%s new balances saved', 0);
    }

    debug('Data seeded into the database.');
  })
  .catch(debug)
  .finally(() => process.exit());
