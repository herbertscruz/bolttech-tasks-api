import { Router } from 'express';

export interface IRouterFactory {
  getRoute(): Router;
}

export default interface IControllerFactory {}
