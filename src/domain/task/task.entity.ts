export enum TaskStatus {
  TODO = 'todo',
  DOING = 'doing',
  DONE = 'done',
}

export default class Task {
  readonly id?: number;

  readonly projectId!: string;

  readonly description!: string;

  readonly status!: TaskStatus;

  readonly createdAt?: Date;

  readonly completedIn?: Date;

  constructor(props: {
    id?: number;
    projectId: string;
    description: string;
    status: TaskStatus;
    createdAt?: Date;
    completedIn?: Date;
  }) {
    Object.assign(this, props);
  }
}
