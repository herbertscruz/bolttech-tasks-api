import IFindOneParameters from '../common/find-one-parameters.interface';
import Token from './token.entity';

export default interface ITokenRepository {
  findOne(params: IFindOneParameters): Promise<Token | null>;

  create(token: Token): Promise<void>;
}
