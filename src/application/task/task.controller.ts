import { Request, Response } from 'express';
import Task from '../../domain/task/task.entity';
import TaskService from '../../domain/task/task.service';
import IController from '../common/controller.interface';
import { HttpRequest } from '../common/http-request.interface';

export default class TaskController implements IController {
  constructor(private readonly taskService: TaskService) {}

  async getAllByProject(
    req: Request,
    res: Response,
  ): Promise<Response<Task[]>> {
    const id = parseInt((req as HttpRequest).id);
    const projectId = parseInt(req.params.projectId);
    const tasks = await this.taskService.getAllByProject(id, projectId);
    return res.status(200).json(tasks);
  }

  async saveTask(req: Request, res: Response): Promise<Response<Task>> {
    const id = parseInt((req as HttpRequest).id);
    const task = await this.taskService.save(id, req.body);
    return res.status(200).json(task);
  }

  async deleteTask(req: Request, res: Response): Promise<Response<void>> {
    const id = parseInt((req as HttpRequest).id);
    const taskId = parseInt(req.params.taskId);
    await this.taskService.delete(id, taskId);
    return res.status(204).send();
  }
}
