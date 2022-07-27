import { omit, pick } from 'lodash';
import User from './user.entity';
import IUserRepository from './user-repository.interface';
import CryptoJS from 'crypto-js';
import env from '../../configurations';
import ValidationError from '../common/validation-error.exception';
import IUserMeResponse from './user-me-response.interface';

export default class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async getSummaryData(userId: number): Promise<IUserMeResponse | null> {
    const result = await this.getCompleteData(userId);
    if (result === null) return null;
    return pick(result, ['id', 'name', 'createdAt']);
  }

  async getCompleteData(userId: number): Promise<User | null> {
    const result = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (result === null) return null;
    return { ...result, password: '' } as User;
  }

  async createUser(user: User): Promise<void> {
    user = omit(user, ['id', 'createdAt', 'updatedAt']);
    user = Object.assign({}, user, {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      password: this.generatePassword(user.password!),
    }) as User;
    await this.userRepository.create(user);
  }

  async updateUser(userId: number, user: User): Promise<User> {
    let result = await this.getCompleteDataWithNullCheck(userId);
    result = omit(Object.assign({}, result, omit(user, 'id')), [
      'password',
      'createdAt',
      'updatedAt',
    ]) as User;
    result = await this.userRepository.update(result);
    return { ...result, password: '' };
  }

  async updateUserPassword(
    userId: number,
    newPassword: string,
  ): Promise<IUserMeResponse> {
    let result = await this.getCompleteDataWithNullCheck(userId);
    result = {
      id: result.id,
      password: this.generatePassword(newPassword),
    } as unknown as User;
    result = await this.userRepository.update(result);
    return pick(result, ['id', 'name', 'createdAt']);
  }

  private async getCompleteDataWithNullCheck(userId: number): Promise<User> {
    const result = await this.getCompleteData(userId);
    if (result === null) throw new ValidationError(env.ERROR.E002);
    return result;
  }

  private generatePassword(rawPassword: string): string {
    return CryptoJS.HmacSHA256(rawPassword, env.API.CRYPTO_SECRET).toString();
  }
}
