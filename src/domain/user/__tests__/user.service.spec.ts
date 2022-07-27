/**
 * @group unit/test
 */

import 'jest-extended';
import User from '../user.entity';
import { faker } from '@faker-js/faker';
import UserService from '../user.service';
import IUserRepository from '../user.repository.interface';
import { omit, pick } from 'lodash';
import env from '../../../configurations';

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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('When the user needs to get their basic data', () => {
    test('should succeed when submitting an existing user', async () => {
      // Given
      const findOne = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValueOnce(userMock);

      // When
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const result = await userService.getSummaryData(userMock.id!);

      // Then
      expect(findOne).toHaveBeenCalledTimes(1);
      expect(findOne).toHaveBeenCalledWith({
        where: { userId: userMock.id },
      });
      expect(result).toStrictEqual(pick(result, ['id', 'name', 'createdAt']));
    });

    test('should return null when submitting a non-existent user', async () => {
      // Given
      const findOne = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValueOnce(null);
      const userId = 2;

      // When
      const result = await userService.getSummaryData(userId);

      // Then
      expect(findOne).toHaveBeenCalledTimes(1);
      expect(findOne).toHaveBeenCalledWith({
        where: { userId },
      });
      expect(result).toBeNull();
    });
  });

  describe('When the user needs to get their complete data', () => {
    test('should succeed when submitting an existing user', async () => {
      // Given
      const findOne = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValueOnce(userMock);

      // When
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const result = await userService.getCompleteData(userMock.id!);

      // Then
      expect(findOne).toHaveBeenCalledTimes(1);
      expect(findOne).toHaveBeenCalledWith({
        where: { userId: userMock.id },
      });
      expect(result).toStrictEqual({ ...userMock, password: '' });
    });
  });

  describe('When the user needs to insert their complete data', () => {
    test('should succeed when submitting the expected data', async () => {
      // Given
      const create = jest
        .spyOn(userRepository, 'create')
        .mockResolvedValueOnce({
          ...userMock,
          password: faker.internet.password(),
        });

      // When
      const result = await userService.createUser(userMock);

      // Then
      expect(create).toHaveBeenCalledTimes(1);
      expect(create).toHaveBeenCalledWith({
        ...omit(userMock, ['id', 'createdAt', 'updatedAt']),
        password: expect.toBeString(),
      });
      expect(result.password).not.toBeEmpty();
      expect(result).toStrictEqual({
        ...userMock,
        password: expect.toBeString(),
      });
    });
  });

  describe('When the user needs to update their complete data', () => {
    test('should succeed when submitting the expected data', async () => {
      // Given
      const findOne = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValueOnce(userMock);
      const update = jest
        .spyOn(userRepository, 'update')
        .mockResolvedValueOnce(userMock);

      // When
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const result = await userService.updateUser(userMock.id!, {
        ...userMock,
        password: faker.internet.password(),
      });

      // Then
      expect(findOne).toHaveBeenCalledTimes(1);
      expect(findOne).toHaveBeenCalledWith({
        where: { userId: userMock.id },
      });
      expect(update).toHaveBeenCalledTimes(1);
      expect(update).toHaveBeenCalledWith(
        omit(userMock, ['password', 'createdAt', 'updatedAt']),
      );
      expect(result.password).toBeEmpty();
      expect(result).toStrictEqual({
        ...userMock,
        password: expect.toBeString(),
      });
    });

    test('should return error when submitting a non-existent user', async () => {
      // Given
      const findOne = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValueOnce(null);

      // When

      // Then
      await expect(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        userService.updateUser(userMock.id!, userMock),
      ).rejects.toThrow(env.ERROR.E002);
      expect(findOne).toHaveBeenCalledTimes(1);
      expect(findOne).toHaveBeenCalledWith({
        where: { userId: userMock.id },
      });
    });
  });

  describe('When the user needs to update their password', () => {
    test('should succeed when submitting the new password', async () => {
      // Given
      const findOne = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValueOnce(userMock);
      const update = jest
        .spyOn(userRepository, 'update')
        .mockResolvedValueOnce(userMock);

      // When
      const result = await userService.updateUserPassword(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        userMock.id!,
        faker.internet.password(),
      );

      // Then
      expect(findOne).toHaveBeenCalledTimes(1);
      expect(findOne).toHaveBeenCalledWith({
        where: { userId: userMock.id },
      });
      expect(update).toHaveBeenCalledTimes(1);
      expect(update).toHaveBeenCalledWith({
        id: userMock.id,
        password: expect.toBeString(),
      });
      expect(result).toStrictEqual(pick(result, ['id', 'name', 'createdAt']));
    });
  });
});
