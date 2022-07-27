import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createProjectTable1658885855534 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.getProjectTable());
    await queryRunner.createForeignKey(
      this.getProjectTable(),
      this.getProjectFKUserId(),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      this.getProjectTable(),
      this.getProjectFKUserId(),
    );
    await queryRunner.dropTable(this.getProjectTable());
  }

  private getProjectTable() {
    return new Table({
      name: 'projects',
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
          name: 'userId',
          type: 'int',
          comment: "User's unique identifier",
        },
        {
          name: 'name',
          type: 'varchar',
          comment: "Project's name",
        },
        {
          name: 'createdAt',
          type: 'datetime',
          precision: 6,
          default: 'CURRENT_TIMESTAMP(6)',
          comment: 'Project registration datetime',
        },
      ],
    });
  }

  private getProjectFKUserId(): TableForeignKey {
    return new TableForeignKey({
      name: 'FK_projects_userId_1',
      columnNames: ['userId'],
      referencedTableName: 'users',
      referencedColumnNames: ['id'],
    });
  }
}
