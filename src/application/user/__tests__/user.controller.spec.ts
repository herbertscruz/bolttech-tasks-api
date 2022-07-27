import { faker } from '@faker-js/faker';
import { Response } from 'express';
import env from '../../../configurations';
import IUserMeResponse from '../../../domain/user/user-me-response.interface';
import User from '../../../domain/user/user.entity';
import UserService from '../../../domain/user/user.service';
import { HttpRequest } from '../../common/http-request.interface';
import UserController from '../user.controller';

/**
 * @group unit/test
 */
describe('UserController', () => {
  const userMock = new User({
    id: 1,
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const userMeResponseMock = {
    id: userMock.id,
    name: userMock.name,
    createdAt: userMock.createdAt,
  } as IUserMeResponse;

  const httpRequestMock = {
    id: userMock.id,
    name: userMock.name,
    createdAt: userMock.createdAt,
    ttl: env.JWT.TTL_MINUTES,
  } as unknown as HttpRequest;

  const responseMock: Response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as Response;

  let userController: UserController;
  let userService: UserService;

  beforeAll(() => {
    userService = new UserService({
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    });

    userController = new UserController(userService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserMe', () => {
    test('success', async () => {
      // Given
      const getSummaryData = jest
        .spyOn(userService, 'getSummaryData')
        .mockResolvedValueOnce(userMeResponseMock);

      // When
      await userController.getUserMe(httpRequestMock, responseMock);

      //Then
      expect(getSummaryData).toHaveBeenCalledTimes(1);
      expect(getSummaryData).toHaveBeenCalledWith(httpRequestMock.id);
      expect(responseMock.status).toHaveBeenCalledTimes(1);
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.json).toHaveBeenCalledTimes(1);
      expect(responseMock.json).toHaveBeenCalledWith(userMeResponseMock);
    });

    test('null', async () => {
      // Given
      const getSummaryData = jest
        .spyOn(userService, 'getSummaryData')
        .mockResolvedValueOnce(null);

      // When
      await userController.getUserMe(httpRequestMock, responseMock);

      //Then
      expect(getSummaryData).toHaveBeenCalledTimes(1);
      expect(getSummaryData).toHaveBeenCalledWith(httpRequestMock.id);
      expect(responseMock.status).toHaveBeenCalledTimes(1);
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.json).toHaveBeenCalledTimes(1);
      expect(responseMock.json).toHaveBeenCalledWith(null);
    });
  });

  describe('getUserFull', () => {
    test('success', async () => {
      // Given
      const getCompleteData = jest
        .spyOn(userService, 'getCompleteData')
        .mockResolvedValueOnce(userMock);
      const newHttpRequestMock = {
        ...httpRequestMock,
        params: {
          userId: userMock.id,
        },
      } as unknown as HttpRequest;

      // When
      await userController.getUserFull(newHttpRequestMock, responseMock);

      //Then
      expect(getCompleteData).toHaveBeenCalledTimes(1);
      expect(getCompleteData).toHaveBeenCalledWith(httpRequestMock.id);
      expect(responseMock.status).toHaveBeenCalledTimes(1);
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.json).toHaveBeenCalledTimes(1);
      expect(responseMock.json).toHaveBeenCalledWith(userMock);
    });

    test('null', async () => {
      // Given
      const getCompleteData = jest
        .spyOn(userService, 'getCompleteData')
        .mockResolvedValueOnce(null);
      const newHttpRequestMock = {
        ...httpRequestMock,
        params: {
          userId: userMock.id,
        },
      } as unknown as HttpRequest;

      // When
      await userController.getUserFull(newHttpRequestMock, responseMock);

      //Then
      expect(getCompleteData).toHaveBeenCalledTimes(1);
      expect(getCompleteData).toHaveBeenCalledWith(httpRequestMock.id);
      expect(responseMock.status).toHaveBeenCalledTimes(1);
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.json).toHaveBeenCalledTimes(1);
      expect(responseMock.json).toHaveBeenCalledWith(null);
    });

    test('error', async () => {
      // Given
      const newHttpRequestMock = {
        ...httpRequestMock,
        params: {
          userId: 2,
        },
        body: userMock,
      } as unknown as HttpRequest;

      // When

      //Then
      await expect(
        userController.getUserFull(newHttpRequestMock, responseMock),
      ).rejects.toThrow(env.ERROR.E003);
    });
  });

  describe('createUser', () => {
    test('success', async () => {
      // Given
      const createUser = jest.spyOn(userService, 'createUser');
      const newHttpRequestMock = {
        ...httpRequestMock,
        body: userMock,
      } as unknown as HttpRequest;

      // When
      await userController.createUser(newHttpRequestMock, responseMock);

      //Then
      expect(createUser).toHaveBeenCalledTimes(1);
      expect(createUser).toHaveBeenCalledWith(newHttpRequestMock.body);
      expect(responseMock.status).toHaveBeenCalledTimes(1);
      expect(responseMock.status).toHaveBeenCalledWith(201);
      expect(responseMock.json).toHaveBeenCalledTimes(0);
    });
  });

  describe('updateUser', () => {
    test('success', async () => {
      // Given
      const updateUser = jest
        .spyOn(userService, 'updateUser')
        .mockResolvedValueOnce(userMock);
      const newHttpRequestMock = {
        ...httpRequestMock,
        params: {
          userId: userMock.id,
        },
        body: userMock,
      } as unknown as HttpRequest;

      // When
      await userController.updateUser(newHttpRequestMock, responseMock);

      //Then
      expect(updateUser).toHaveBeenCalledTimes(1);
      expect(updateUser).toHaveBeenCalledWith(
        newHttpRequestMock.params.userId,
        newHttpRequestMock.body,
      );
      expect(responseMock.status).toHaveBeenCalledTimes(1);
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.json).toHaveBeenCalledTimes(1);
      expect(responseMock.json).toHaveBeenCalledWith(userMock);
    });

    test('error', async () => {
      // Given
      const newHttpRequestMock = {
        ...httpRequestMock,
        params: {
          userId: 2,
        },
        body: userMock,
      } as unknown as HttpRequest;

      // When

      //Then
      await expect(
        userController.updateUser(newHttpRequestMock, responseMock),
      ).rejects.toThrow(env.ERROR.E004);
    });
  });

  describe('updatePassword', () => {
    test('success', async () => {
      // Given
      const updateUserPassword = jest
        .spyOn(userService, 'updateUserPassword')
        .mockResolvedValueOnce(userMeResponseMock);
      const newHttpRequestMock = {
        ...httpRequestMock,
        params: {
          userId: userMock.id,
        },
        body: {
          newPassword: faker.internet.password(),
        },
      } as unknown as HttpRequest;

      // When
      await userController.updatePassword(newHttpRequestMock, responseMock);

      //Then
      expect(updateUserPassword).toHaveBeenCalledTimes(1);
      expect(updateUserPassword).toHaveBeenCalledWith(
        newHttpRequestMock.params.userId,
        newHttpRequestMock.body.newPassword,
      );
      expect(responseMock.status).toHaveBeenCalledTimes(1);
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.json).toHaveBeenCalledTimes(1);
      expect(responseMock.json).toHaveBeenCalledWith(userMeResponseMock);
    });

    test('error', async () => {
      // Given
      const newHttpRequestMock = {
        ...httpRequestMock,
        params: {
          userId: 2,
        },
        body: {
          newPassword: faker.internet.password(),
        },
      } as unknown as HttpRequest;

      // When

      //Then
      await expect(
        userController.updatePassword(newHttpRequestMock, responseMock),
      ).rejects.toThrow(env.ERROR.E005);
    });
  });
});
