import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUserTable1658881391501 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.getUserTable());
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.getUserTable());
  }

  private getUserTable() {
    return new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
          comment: "User's unique identifier",
        },
        {
          name: 'name',
          type: 'varchar',
          comment: "User's full name",
        },
        {
          name: 'email',
          type: 'varchar',
          isUnique: true,
          comment: "User's email",
        },
        {
          name: 'password',
          type: 'varchar',
          comment: "User's password",
        },
        {
          name: 'active',
          type: 'boolean',
          default: true,
          comment: 'User activation status',
        },
        {
          name: 'createdAt',
          type: 'datetime',
          precision: 6,
          default: 'CURRENT_TIMESTAMP(6)',
          comment: 'User registration datetime',
        },
        {
          name: 'updatedAt',
          type: 'datetime',
          precision: 6,
          default: 'CURRENT_TIMESTAMP(6)',
          comment: 'User update datetime',
        },
      ],
    });
  }
}
