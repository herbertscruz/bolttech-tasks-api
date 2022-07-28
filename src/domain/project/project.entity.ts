import Task from '../task/task.entity';

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
