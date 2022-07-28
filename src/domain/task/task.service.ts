import Task from './task.entity';
import ITaskRepository from './task-repository.interface';
import ValidationError from '../common/validation-error.exception';
import env from '../../configurations';
import { omit } from 'lodash';

export default class TaskService {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async getAllByProject(projectId: number): Promise<Task[]> {
    return this.taskRepository.find({
      where: { projectId },
      take: 100,
      skip: 0,
    });
  }

  async save(task: Task): Promise<Task> {
    task = omit(task, 'createdAt');
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

  async delete(task: Task): Promise<void> {
    const result = await this.taskRepository.findOne({
      where: { id: task.id },
    });
    if (result === null) throw new ValidationError(env.ERROR.E008);
    await this.taskRepository.delete(task);
  }
}
