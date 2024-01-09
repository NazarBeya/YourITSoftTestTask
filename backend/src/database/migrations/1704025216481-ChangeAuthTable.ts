import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeAuthTable1704025216481 implements MigrationInterface {
  name = 'ChangeAuthTable1704025216481';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "auth" DROP CONSTRAINT "FK_028230bebee843063723f2a2681"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth" RENAME COLUMN "authId" TO "userId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth" ADD CONSTRAINT "FK_373ead146f110f04dad60848154" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "auth" DROP CONSTRAINT "FK_373ead146f110f04dad60848154"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth" RENAME COLUMN "userId" TO "authId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth" ADD CONSTRAINT "FK_028230bebee843063723f2a2681" FOREIGN KEY ("authId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
