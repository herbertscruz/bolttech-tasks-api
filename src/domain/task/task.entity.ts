export enum TaskStatus {
  TODO = 'todo',
  DOING = 'doing',
  DONE = 'done',
}

export default class Task {
  readonly id?: number;

  readonly projectId!: number;

  readonly description!: string;

  readonly status!: TaskStatus;

  readonly marked!: boolean;

  readonly createdAt?: Date;

  public completedIn?: Date;

  constructor(props: {
    id?: number;
    projectId: number;
    description: string;
    status: TaskStatus;
    marked?: boolean;
    createdAt?: Date;
    completedIn?: Date;
  }) {
    Object.assign(this, props);
  }
}
