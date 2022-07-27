import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class createTokenTable1658882971144 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.getTokenTable());
    await queryRunner.createForeignKey(
      this.getTokenTable(),
      this.getTokenFKUserId(),
    );
    await queryRunner.createIndex(this.getTokenTable(), this.getTokenUnique());
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      this.getTokenTable(),
      this.getTokenFKUserId(),
    );
    await queryRunner.dropIndex(this.getTokenTable(), this.getTokenUnique());
    await queryRunner.dropTable(this.getTokenTable());
  }

  private getTokenTable() {
    return new Table({
      name: 'tokens',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
          comment: 'Token unique identifier',
        },
        {
          name: 'userId',
          type: 'int',
          comment: "User's unique identifier",
        },
        {
          name: 'token',
          type: 'varchar',
          isUnique: true,
          comment: 'JWT Token',
        },
        {
          name: 'createdAt',
          type: 'datetime',
          precision: 6,
          default: 'CURRENT_TIMESTAMP(6)',
          comment: 'Token registration datetime',
        },
        {
          name: 'expiresIn',
          type: 'datetime',
          precision: 6,
          comment: 'User token expiration datetime',
        },
      ],
    });
  }

  private getTokenFKUserId(): TableForeignKey {
    return new TableForeignKey({
      name: 'FK_tokens_userId_1',
      columnNames: ['userId'],
      referencedTableName: 'users',
      referencedColumnNames: ['id'],
    });
  }

  private getTokenUnique(): TableIndex {
    return new TableIndex({
      name: 'UQ_tokens_1',
      columnNames: ['token'],
      isUnique: true,
    });
  }
}
