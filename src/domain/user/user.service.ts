import { omit, pick } from 'lodash';
import User from './user.entity';
import IUserRepository from './user.repository.interface';
import CryptoJS from 'crypto-js';
import env from '../../configurations';

export default class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async getUserMe(
    userId: number,
  ): Promise<{ id?: number; name?: string; createdAt?: Date } | null> {
    const user = await this.userRepository.findOne({
      where: { userId, active: true },
    });
    if (user === null) return null;
    return pick(user, ['id', 'name', 'createdAt']);
  }

  async getUserFull(userId: number): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { userId, active: true },
    });
    if (user === null) return null;
    return { ...user, password: '' } as User;
  }

  async createUser(user: User) {
    user = omit(user, 'id');
    return this.userRepository.create(user);
  }

  async updateUser(userId: number, user: User) {
    user = { ...user, id: userId, password: '' } as User;
    return this.userRepository.update(user);
  }

  async updateUserPassword(userId: number, newPassword: string) {
    let user = await this.userRepository.findOne({
      where: { userId, active: true },
    });
    const password = CryptoJS.AES.encrypt(newPassword, env.API.CRYPTO_SECRET);
    user = { ...user, password } as unknown as User;
    return this.userRepository.update(user);
  }
}
