import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Task, { TaskStatus } from '../../../../domain/task/task.entity';
import IModel from '../model.interface';
import ProjectModel from './project.model';

@Entity('tasks')
export default class TaskModel implements IModel<Task> {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public projectId!: string;

  @Column()
  public description!: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
  })
  public status!: TaskStatus;

  @CreateDateColumn()
  public createdAt?: Date;

  @Column()
  public completedIn?: Date;

  @ManyToOne(() => ProjectModel, (project) => project.tasks)
  public project!: ProjectModel;

  toModel(entity: Task): this {
    this.id = entity.id;
    this.projectId = entity.projectId;
    this.description = entity.description;
    this.status = entity.status;
    this.createdAt = entity.createdAt;
    this.completedIn = entity.completedIn;
    return this;
  }

  toEntity(): Task {
    return new Task({
      id: this.id,
      projectId: this.projectId,
      description: this.description,
      status: this.status,
      createdAt: this.createdAt,
      completedIn: this.completedIn,
    });
  }
}
