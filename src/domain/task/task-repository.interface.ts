import IFindOneParameters from '../common/find-one-parameters.interface';
import IFindParameters from '../common/find-parameters.interface';
import Task from './task.entity';

export default interface ITaskRepository {
  findOne(params: IFindOneParameters): Promise<Task | null>;

  find(params: IFindParameters): Promise<Task[]>;

  save(task: Task): Promise<Task>;

  delete(taskId: number): Promise<void>;
}
