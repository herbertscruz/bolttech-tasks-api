import { IExpressAdapterOptions } from './express.adapter';
import express from 'express';
import env from '../../../configurations';
import { errorHandler } from '../error-handler.factory';

export const ExpressOptions = {
  port: env.API.PORT,
  beforeMiddlewares: [express.json(), express.urlencoded({ extended: true })],
  routers: [],
  errorHandlers: [errorHandler()],
} as IExpressAdapterOptions;
