import { DataSource, EntityTarget, Repository } from 'typeorm';

export default interface IDatabaseAdapter {
  start(): Promise<void>;
  close(): Promise<void>;
  getConnection(): DataSource;
  isConnected(): boolean;
  getRepository<Entity>(target: EntityTarget<Entity>): Repository<Entity>;
}
