import { Repository } from 'typeorm';
import IDatabaseAdapter from '../../application/common/database-adapter.interface';
import IFindOneParameters from '../../domain/common/find-one-parameters.interface';
import IFindParameters from '../../domain/common/find-parameters.interface';
import ITaskRepository from '../../domain/task/task-repository.interface';
import Task from '../../domain/task/task.entity';
import TaskModel from '../database/typeorm/entities/task.model';

export default class TaskRepository implements ITaskRepository {
  private taskRepository: Repository<TaskModel>;

  constructor(database: IDatabaseAdapter) {
    this.taskRepository = database.getRepository(TaskModel);
  }

  async findOne(params: IFindOneParameters): Promise<Task | null> {
    const result = await this.taskRepository.findOne({ ...params });
    if (result === null) return null;
    return result.toEntity();
  }

  async save(task: Task): Promise<Task> {
    const model = new TaskModel().toModel(task);
    const result = await this.taskRepository.save(model);
    return result.toEntity();
  }

  async find(params: IFindParameters): Promise<Task[]> {
    const result = await this.taskRepository.find({ ...params });

    return result.map((task) => task.toEntity());
  }

  async delete(taskId: number): Promise<void> {
    await this.taskRepository.delete(taskId);
  }
}
