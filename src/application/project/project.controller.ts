import { Request, Response } from 'express';
import env from '../../configurations';
import ValidationError from '../../domain/common/validation-error.exception';
import Project from '../../domain/project/project.entity';
import ProjectService from '../../domain/project/project.service';
import IController from '../common/controller.interface';
import { HttpRequest } from '../common/http-request.interface';

export default class ProjectController implements IController {
  constructor(private readonly projectService: ProjectService) {}

  async getAllByUser(
    req: Request,
    res: Response,
  ): Promise<Response<Project[]>> {
    const id = parseInt((req as HttpRequest).id);
    const userId = parseInt(req.params.userId);
    if (id !== userId) throw new ValidationError(env.ERROR.E012);
    const projects = await this.projectService.getAllByUser(id);
    return res.status(200).json(projects);
  }

  async saveProject(req: Request, res: Response): Promise<Response<Project>> {
    const id = parseInt((req as HttpRequest).id);
    const project = await this.projectService.save({ ...req.body, userId: id });
    return res.status(200).json(project);
  }

  async deleteProjectAndTasks(
    req: Request,
    res: Response,
  ): Promise<Response<void>> {
    const id = parseInt((req as HttpRequest).id);
    const projectId = parseInt(req.params.projectId);
    await this.projectService.delete(id, projectId);
    return res.status(204).send();
  }
}
