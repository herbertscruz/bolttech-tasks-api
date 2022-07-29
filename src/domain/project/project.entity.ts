import Task from '../task/task.entity';

export default class Project {
  readonly id?: number;

  readonly userId!: string;

  readonly name!: string;

  readonly createdAt?: Date;

  public tasks?: Task[];

  constructor(props: {
    id?: number;
    userId: string;
    name: string;
    createdAt?: Date;
    tasks?: Task[];
  }) {
    Object.assign(this, props);
  }
}
