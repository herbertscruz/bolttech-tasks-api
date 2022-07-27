import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import UserModel from './user.model';

@Entity('tokens')
export default class TokenModel {
  @PrimaryGeneratedColumn()
  private id?: number;

  @Column()
  private userId!: string;

  @Column()
  @Index({ unique: true })
  private token!: string;

  @CreateDateColumn()
  private createdAt?: Date;

  @Column()
  private expiresIn!: Date;

  @ManyToOne(() => UserModel, (user) => user.tokens)
  readonly user!: UserModel;
}
