import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskStatus } from '../../../../domain/task/task.entity';
import ProjectModel from './project.model';

@Entity('tasks')
export default class TaskModel {
  @PrimaryGeneratedColumn()
  private id?: number;

  @Column()
  private projectId!: string;

  @Column()
  private description!: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
  })
  private status!: TaskStatus;

  @CreateDateColumn()
  private createdAt?: Date;

  @Column()
  private completedIn!: Date;

  @ManyToOne(() => ProjectModel, (project) => project.tasks)
  readonly project!: ProjectModel;
}
