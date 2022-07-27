import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Token from '../../../../domain/token/token.entity';
import IModel from '../model.interface';
import UserModel from './user.model';

@Entity('tokens')
export default class TokenModel implements IModel<Token> {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public userId!: string;

  @Column()
  @Index({ unique: true })
  public token!: string;

  @CreateDateColumn()
  public createdAt?: Date;

  @Column()
  public expiresIn?: Date;

  @ManyToOne(() => UserModel, (user) => user.tokens)
  public user!: UserModel;

  toModel(entity: Token): this {
    this.id = entity.id;
    this.userId = entity.userId;
    this.token = entity.token;
    this.createdAt = entity.createdAt;
    this.expiresIn = entity.expiresIn;
    return this;
  }

  toEntity(): Token {
    return new Token({
      id: this.id,
      userId: this.userId,
      token: this.token,
      createdAt: this.createdAt,
      expiresIn: this.expiresIn,
    });
  }
}
