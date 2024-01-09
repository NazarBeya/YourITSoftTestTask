import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAuthTable1704025152020 implements MigrationInterface {
  name = 'CreateAuthTable1704025152020';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "auth" ("id" SERIAL NOT NULL, "accessToken" character varying NOT NULL, "refreshToken" character varying NOT NULL, "authId" integer, CONSTRAINT "REL_028230bebee843063723f2a268" UNIQUE ("authId"), CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "userName" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "isActive" SET DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth" ADD CONSTRAINT "FK_028230bebee843063723f2a2681" FOREIGN KEY ("authId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "auth" DROP CONSTRAINT "FK_028230bebee843063723f2a2681"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "isActive" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "userName"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "lastName" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "firstName" character varying NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "auth"`);
  }
}
