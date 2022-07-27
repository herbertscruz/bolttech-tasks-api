import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from '../../../../domain/user/user.entity';
import IModel from '../model.interface';
import ProjectModel from './project.model';
import TokenModel from './token.model';

@Entity('users')
export default class UserModel implements IModel<User> {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public name!: string;

  @Column()
  public email!: string;

  @Column()
  public password?: string;

  @Column()
  public active!: boolean;

  @CreateDateColumn()
  public createdAt?: Date;

  @UpdateDateColumn()
  public updatedAt?: Date;

  @OneToMany(() => TokenModel, (token) => token.user)
  public tokens!: TokenModel[];

  @OneToMany(() => ProjectModel, (project) => project.user)
  public projects!: ProjectModel[];

  toModel(entity: User): this {
    this.id = entity.id;
    this.name = entity.name;
    this.email = entity.email;
    this.password = entity.password;
    this.active = entity.active;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
    return this;
  }

  toEntity(): User {
    return new User({
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      active: this.active,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  }
}
