import { Repository } from 'typeorm';
import IDatabaseAdapter from '../../application/common/database-adapter.interface';
import IFindOneParameters from '../../domain/common/find-one-parameters.interface';
import IUserRepository from '../../domain/user/user-repository.interface';
import User from '../../domain/user/user.entity';
import UserModel from '../database/typeorm/entities/user.model';

export default class UserRepository implements IUserRepository {
  private userRepository: Repository<UserModel>;

  constructor(database: IDatabaseAdapter) {
    this.userRepository = database.getRepository(UserModel);
  }

  async findOne(params: IFindOneParameters): Promise<User | null> {
    const result = await this.userRepository.findOne({ ...params });
    if (result === null) return null;
    return result.toEntity();
  }

  async create(user: User): Promise<void> {
    const model = new UserModel().toModel(user);
    await this.userRepository.insert(model);
  }

  async update(user: User): Promise<User> {
    const model = new UserModel().toModel(user);
    const result = await this.userRepository.save(model);
    return result.toEntity();
  }
}
