import { StatusCodes } from 'http-status-codes';

export default class ValidationError extends Error {
  readonly status = StatusCodes.UNPROCESSABLE_ENTITY;
}
