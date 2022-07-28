import { Repository } from 'typeorm';
import IDatabaseAdapter from '../../application/common/database-adapter.interface';
import IFindOneParameters from '../../domain/common/find-one-parameters.interface';
import ITokenRepository from '../../domain/token/token-repository.interface';
import Token from '../../domain/token/token.entity';
import tokenEntity from '../../domain/token/token.entity';
import TokenModel from '../database/typeorm/entities/token.model';

export default class TokenRepository implements ITokenRepository {
  private tokenRepository: Repository<TokenModel>;

  constructor(database: IDatabaseAdapter) {
    this.tokenRepository = database.getRepository(TokenModel);
  }

  async findOne(params: IFindOneParameters): Promise<Token | null> {
    const result = await this.tokenRepository.findOne({ ...params });
    if (result === null) return null;
    return result.toEntity();
  }

  async create(token: tokenEntity): Promise<void> {
    const model = new TokenModel().toModel(token);
    await this.tokenRepository.insert(model);
  }
}
