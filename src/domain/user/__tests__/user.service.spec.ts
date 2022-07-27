/**
 * @group unit/test
 */

import User from '../user.entity';
import { faker } from '@faker-js/faker';
import UserService from '../user.service';
import IUserRepository from '../user.repository.interface';
import { pick } from 'lodash';

describe('UserService', () => {
  const userMock = new User({
    id: 1,
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  let userService: UserService;
  let userRepository: IUserRepository;

  beforeAll(async () => {
    userRepository = {
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    } as unknown as IUserRepository;
    userService = new UserService(userRepository);
  });

  describe('When the user needs to get their basic data', () => {
    test('should succeed when sending an existing userId', async () => {
      // Given
      const findOne = jest
        .spyOn(userRepository, 'findOne')
        .mockReset()
        .mockResolvedValueOnce(userMock);

      // When
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const result = await userService.getUserMe(userMock.id!);

      // Then
      expect(findOne).toHaveBeenCalledTimes(1);
      expect(findOne).toHaveBeenCalledWith({
        where: { userId: userMock.id, active: true },
      });
      expect(result).toStrictEqual(pick(result, ['id', 'name', 'createdAt']));
    });

    test('should return null when sending a non-existent userId', async () => {
      // Given
      const findOne = jest
        .spyOn(userRepository, 'findOne')
        .mockReset()
        .mockResolvedValueOnce(null);
      const userId = 2;

      // When
      const result = await userService.getUserMe(userId);

      // Then
      expect(findOne).toHaveBeenCalledTimes(1);
      expect(findOne).toHaveBeenCalledWith({
        where: { userId, active: true },
      });
      expect(result).toBeNull();
    });
  });

  describe('When the user needs to get their complete data', () => {
    test('should succeed when sending an existing userId', async () => {
      // Given
      const findOne = jest
        .spyOn(userRepository, 'findOne')
        .mockReset()
        .mockResolvedValueOnce(userMock);

      // When
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const result = await userService.getUserFull(userMock.id!);

      // Then
      expect(findOne).toHaveBeenCalledTimes(1);
      expect(findOne).toHaveBeenCalledWith({
        where: { userId: userMock.id, active: true },
      });
      expect(result).toStrictEqual({ ...userMock, password: '' });
    });

    test('should return null when sending a non-existent userId', async () => {
      // Given
      const findOne = jest
        .spyOn(userRepository, 'findOne')
        .mockReset()
        .mockResolvedValueOnce(null);
      const userId = 2;

      // When
      const result = await userService.getUserFull(userId);

      // Then
      expect(findOne).toHaveBeenCalledTimes(1);
      expect(findOne).toHaveBeenCalledWith({
        where: { userId, active: true },
      });
      expect(result).toBeNull();
    });
  });
});
