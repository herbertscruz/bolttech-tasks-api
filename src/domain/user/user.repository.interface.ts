import IFindOneParameters from '../common/find-one-parameters.interface';
import User from './user.entity';

export default interface IUserRepository {
  findOne(params: IFindOneParameters): Promise<User | null>;

  create(user: User): Promise<User>;

  update(user: User): Promise<User>;
}
