import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import ProjectModel from './project.model';
import TokenModel from './token.model';

@Entity('users')
export default class UserModel {
  @PrimaryGeneratedColumn()
  private id?: number;

  @Column()
  private name!: string;

  @Column()
  private email!: string;

  @Column()
  private active!: boolean;

  @CreateDateColumn()
  private createdAt?: Date;

  @UpdateDateColumn()
  private updatedAt!: Date;

  @OneToMany(() => TokenModel, (token) => token.user)
  readonly tokens!: TokenModel[];

  @OneToMany(() => ProjectModel, (project) => project.user)
  readonly projects!: ProjectModel[];
}
