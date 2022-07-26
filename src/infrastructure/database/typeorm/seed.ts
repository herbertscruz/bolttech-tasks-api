import { AppDataSource } from './datasource.config';
import debugPkg from 'debug';
const debug = debugPkg('bolttech:infrastructure:database:typeorm:seed');

AppDataSource.initialize()
  .then(async () => {
    debug('Seeding data in the database...');

    debug('Data seeded into the database.');
  })
  .catch(debug)
  .finally(() => process.exit());
