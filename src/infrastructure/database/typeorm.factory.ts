import { AppDataSource } from './typeorm/datasource.config';
import TypeORMAdapter from './typeorm/typeorm.adapter';

export default async function typeormFactory(): Promise<TypeORMAdapter> {
  const datasource = new TypeORMAdapter(AppDataSource);
  await datasource.start();
  return datasource;
}
