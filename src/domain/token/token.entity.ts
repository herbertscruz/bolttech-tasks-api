export default class Token {
  readonly id?: number;

  readonly userId!: string;

  readonly token!: string;

  readonly createdAt?: Date;

  readonly expiresIn?: Date;

  constructor(props: {
    id?: number;
    name: string;
    email: string;
    active: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    Object.assign(this, props);
  }
}
