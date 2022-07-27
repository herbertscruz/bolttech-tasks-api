export default class Token {
  readonly id?: number;

  readonly userId!: string;

  readonly token!: string;

  readonly createdAt?: Date;

  readonly expiresIn?: Date;

  constructor(props: {
    id?: number;
    userId: string;
    token: string;
    createdAt?: Date;
    expiresIn?: Date;
  }) {
    Object.assign(this, props);
  }
}
