import { Server } from 'http';

export default interface IHttp {
  start(port?: number): Promise<Server>;
  close(): Promise<void>;
  getServer(): Server;
}
