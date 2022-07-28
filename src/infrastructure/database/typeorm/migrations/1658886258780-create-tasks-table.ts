import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { TaskStatus } from '../../../../domain/task/task.entity';

export class createTasksTable1658886258780 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.getTaskTable());
    await queryRunner.createForeignKey(
      this.getTaskTable(),
      this.getTaskFKProjectId(),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      this.getTaskTable(),
      this.getTaskFKProjectId(),
    );
    await queryRunner.dropTable(this.getTaskTable());
  }

  private getTaskTable() {
    return new Table({
      name: 'tasks',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
          comment: 'Project unique identifier',
        },
        {
          name: 'projectId',
          type: 'int',
          comment: "Project's unique identifier",
        },
        {
          name: 'description',
          type: 'varchar',
          comment: "Project's description",
        },
        {
          name: 'status',
          type: 'enum',
          enum: Object.values(TaskStatus),
          comment: 'Invoice posting type',
        },
        {
          name: 'createdAt',
          type: 'datetime',
          precision: 6,
          default: 'CURRENT_TIMESTAMP(6)',
          comment: 'Project registration datetime',
        },
        {
          name: 'completedIn',
          type: 'datetime',
          precision: 6,
          comment: 'Datetime when the task was completed',
        },
      ],
    });
  }

  private getTaskFKProjectId(): TableForeignKey {
    return new TableForeignKey({
      name: 'FK_tasks_projectId_1',
      columnNames: ['projectId'],
      referencedTableName: 'projects',
      referencedColumnNames: ['id'],
      onDelete: 'cascade',
    });
  }
}
