export enum TaskStatus {
  TODO = 'todo',
  DOING = 'doing',
  DONE = 'done',
}

export class Task {
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

export default class Project {
  readonly id?: number;

  readonly userId!: string;

  readonly name!: string;

  readonly createdAt?: Date;

  readonly tasks: Task[] = [];

  constructor(props: {
    id?: number;
    userId: string;
    name: string;
    createdAt?: Date;
    tasks: Task[];
  }) {
    const tasks = props?.tasks.map((task: any) => new Task(task));
    Object.assign(this, props, { tasks });
  }
}
