import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Project from '../../../../domain/project/project.entity';
import IModel from '../model.interface';
import TaskModel from './task.model';
import UserModel from './user.model';

@Entity('projects')
export default class ProjectModel implements IModel<Project> {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public userId!: string;

  @Column()
  public name!: string;

  @CreateDateColumn()
  public createdAt?: Date;

  @ManyToOne(() => UserModel, (user) => user.tokens)
  public user!: UserModel;

  @OneToMany(() => TaskModel, (task) => task.project)
  public tasks!: TaskModel[];

  toModel(entity: Project): this {
    this.id = entity.id;
    this.userId = entity.userId;
    this.name = entity.name;
    this.createdAt = entity.createdAt;
    this.tasks = entity.tasks.map((task) => new TaskModel().toModel(task));
    return this;
  }

  toEntity(): Project {
    return new Project({
      id: this.id,
      userId: this.userId,
      name: this.name,
      createdAt: this.createdAt,
      tasks: this.tasks.map((task) => task.toEntity()),
    });
  }
}
