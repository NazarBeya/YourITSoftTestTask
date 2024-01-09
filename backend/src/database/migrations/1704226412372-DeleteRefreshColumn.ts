import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteRefreshColumn1704226412372 implements MigrationInterface {
    name = 'DeleteRefreshColumn1704226412372'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth" DROP COLUMN "refreshToken"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth" ADD "refreshToken" character varying NOT NULL`);
    }

}
