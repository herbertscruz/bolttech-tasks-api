import Task from './task.entity';
import ITaskRepository from './task-repository.interface';
import ValidationError from '../common/validation-error.exception';
import env from '../../configurations';
import { omit } from 'lodash';
import IProjectRepository from '../project/project-repository.interface';

export default class TaskService {
  constructor(
    private readonly taskRepository: ITaskRepository,
    private readonly projectRepository: IProjectRepository,
  ) {}

  async getAllByProject(userId: number, projectId: number): Promise<Task[]> {
    const project = await this.projectRepository.findOne({
      where: { userId, id: projectId },
    });
    if (project === null) throw new ValidationError(env.ERROR.E012);
    return this.taskRepository.find({
      where: { projectId },
      take: 100,
      skip: 0,
    });
  }

  async save(userId: number, task: Task): Promise<Task> {
    task = omit(task, 'createdAt');
    const project = await this.projectRepository.findOne({
      where: { userId, id: task.projectId },
    });
    if (project === null) throw new ValidationError(env.ERROR.E011);
    if (task.id) {
      const result = await this.taskRepository.findOne({
        where: { id: task.id },
      });

      if (result) {
        return this.taskRepository.save(Object.assign({}, result, task));
      }
    }
    task = omit(task, 'id');
    return this.taskRepository.save(task);
  }

  async delete(userId: number, taskId: number): Promise<void> {
    const result = await this.taskRepository.findOne({
      where: { id: taskId },
    });
    if (result === null) throw new ValidationError(env.ERROR.E009);
    const project = await this.projectRepository.findOne({
      where: { userId, id: result.projectId },
    });
    if (project === null) throw new ValidationError(env.ERROR.E010);
    await this.taskRepository.delete(taskId);
  }
}
