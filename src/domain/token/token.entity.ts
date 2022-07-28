import jwt from 'jsonwebtoken';
import { pick } from 'lodash';
import moment from 'moment';
import env from '../../configurations';
import User from '../user/user.entity';

export default class Token {
  readonly id?: number;

  readonly userId!: number;

  public token!: string;

  public createdAt: Date = new Date();

  public ttl: number = env.JWT.TTL_MINUTES;

  constructor(props?: {
    id?: number;
    userId: number;
    token?: string;
    createdAt?: Date;
    ttl?: number;
  }) {
    Object.assign(this, props);
  }

  isExpired(): boolean {
    const expiresIn = moment(this.createdAt).add(this.ttl, 'minutes');
    return moment().isAfter(expiresIn);
  }

  generate(user: User) {
    const data = {
      ...pick(user, ['id', 'name']),
      createdAt: this.createdAt,
      ttl: this.ttl,
    };
    this.token = jwt.sign(data, env.JWT.SECRET);
  }
}
