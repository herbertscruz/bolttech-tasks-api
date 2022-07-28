import 'reflect-metadata';
import { DataSource } from 'typeorm';
import env from '../../../configurations';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: env.DB.HOST,
  port: env.DB.PORT,
  username: env.DB.USERNAME,
  password: env.DB.PASSWORD,
  database: env.DB.DATABASE,
  synchronize: false,
  logging: env.DB.LOGGING,
  entities: [`${__dirname}/entities/**/*{.ts,.js}`],
  migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
  subscribers: [`${__dirname}/subscribers/**/*{.ts,.js}`],
  timezone: 'UTC',
});
