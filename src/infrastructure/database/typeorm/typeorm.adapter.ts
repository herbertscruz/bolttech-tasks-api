import { DataSource, EntityTarget, Repository } from 'typeorm';
import IDatabase from '../../../application/common/database-adapter.interface';
import debugPkg from 'debug';
const debug = debugPkg(
  'bolttech:infrastructure:database:typeorm:typeorm:adapter',
);

export default class TypeORMAdapter implements IDatabase {
  private conn: DataSource | undefined;
  private driveType: string;

  constructor(readonly dataSource: DataSource) {
    this.driveType = dataSource?.options?.type?.toUpperCase();
  }

  public async start() {
    try {
      if (this.conn) return;
      this.conn = await this.dataSource.initialize();
      debug(`Connection Established - ${this.driveType}🚀`);
    } catch (err: any) {
      debug(`Error creating connecting😞 - ${this.driveType}`, err);
    }
  }

  public async close() {
    if (!this.conn) throw new Error('No database connection');
    await this.conn.destroy();

    debug(`Connection closed - ${this.driveType}🚀`);
  }

  public getConnection(): DataSource {
    if (!this.conn) throw new Error('No database connection');
    return this.conn;
  }

  public isConnected() {
    if (!this.conn) throw new Error('No database connection');
    return this.conn.isInitialized;
  }

  public getRepository<Entity>(
    target: EntityTarget<Entity>,
  ): Repository<Entity> {
    if (!this.conn) throw new Error('No database connection');
    return this.conn.getRepository(target);
  }
}
