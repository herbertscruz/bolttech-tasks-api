import Token from './token.entity';
import ITokenRepository from './token-repository.interface';
import IUserRepository from '../user/user-repository.interface';
import ValidationError from '../common/validation-error.exception';
import env from '../../configurations';
import IEmail from '../common/email.interface';
import User from '../user/user.entity';
import debugPkg from 'debug';
import { delay } from 'lodash';
const debug = debugPkg('bolttech:domain:token:token:service');

export default class TokenService {
  constructor(
    private readonly tokenRepository: ITokenRepository,
    private readonly userRepository: IUserRepository,
    private readonly emailService: IEmail,
  ) {}

  async getByToken(token: string): Promise<Token | null> {
    return this.tokenRepository.findOne({
      where: { token },
    });
  }

  async createTokenForUser(userId: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId, active: true },
    });
    if (user === null) throw new ValidationError(env.ERROR.E002);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const token = new Token({ userId: user.id! });
    token.generate(user);

    await this.tokenRepository.create(token);
  }

  async renewPassword(email: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { email, active: true },
    });
    if (user === null) throw new ValidationError(env.ERROR.E002);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const token = new Token({ userId: user.id!, ttl: 1 });
    token.generate(user);

    await this.tokenRepository.create(token);
    this.sendEmail(user, token);
  }

  private sendEmail(user: User, token: Token, retry = 3) {
    this.emailService
      .send(
        user.email,
        'Bolttech - Password recovery',
        `Hi ${user.name}!<br />Password renewal requested. If you requested it, go to this <a href="${env.API.WEB_APP_URL}/renew?token=${token.token}" target="_blank">link</a>, otherwise ignore this message.`,
      )
      .then(debug)
      .catch((err) => {
        debug(err);
        delay(() => {
          this.sendEmail(user, token, --retry);
        }, 5000);
      })
      .finally(() => debug('Email successfully sent'));
  }
}
