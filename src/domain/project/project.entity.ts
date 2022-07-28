export default class Project {
  readonly id?: number;

  readonly userId!: string;

  readonly name!: string;

  readonly createdAt?: Date;

  constructor(props: {
    id?: number;
    userId: string;
    name: string;
    createdAt?: Date;
  }) {
    Object.assign(this, props);
  }
}
