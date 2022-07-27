import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import TaskModel from './task.model';
import UserModel from './user.model';

@Entity('projects')
export default class ProjectModel {
  @PrimaryGeneratedColumn()
  private id?: number;

  @Column()
  private userId!: string;

  @Column()
  private name!: string;

  @CreateDateColumn()
  private createdAt?: Date;

  @ManyToOne(() => UserModel, (user) => user.tokens)
  readonly user!: UserModel;

  @OneToMany(() => TaskModel, (task) => task.project)
  readonly tasks!: TaskModel[];
}
