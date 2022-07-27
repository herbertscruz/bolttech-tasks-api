export default class User {
  readonly id?: number;

  readonly name!: string;

  readonly email!: string;

  readonly password?: string;

  readonly active!: boolean;

  readonly createdAt?: Date;

  readonly updatedAt?: Date;

  constructor(props: {
    id?: number;
    name: string;
    email: string;
    password: string;
    active: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    Object.assign(this, props);
  }
}
