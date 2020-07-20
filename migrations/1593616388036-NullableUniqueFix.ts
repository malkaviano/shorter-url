import {MigrationInterface, QueryRunner} from "typeorm";

export class NullableUniqueFix1593616388036 implements MigrationInterface {
    name = 'NullableUniqueFix1593616388036'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "url" DROP CONSTRAINT "FK_2919f59acab0f44b9a244d35bdb"`, undefined);
        await queryRunner.query(`ALTER TABLE "url" DROP COLUMN "shortUrl"`, undefined);
        await queryRunner.query(`ALTER TABLE "url" ADD "shortUrl" character varying(50) NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "url" ALTER COLUMN "userId" SET NOT NULL`, undefined);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_5f81972de6fed8a2e99a818a8b" ON "url" ("shortUrl") `, undefined);
        await queryRunner.query(`ALTER TABLE "url" ADD CONSTRAINT "FK_2919f59acab0f44b9a244d35bdb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "url" DROP CONSTRAINT "FK_2919f59acab0f44b9a244d35bdb"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_5f81972de6fed8a2e99a818a8b"`, undefined);
        await queryRunner.query(`ALTER TABLE "url" ALTER COLUMN "userId" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "url" DROP COLUMN "shortUrl"`, undefined);
        await queryRunner.query(`ALTER TABLE "url" ADD "shortUrl" character varying(20) NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "url" ADD CONSTRAINT "FK_2919f59acab0f44b9a244d35bdb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

}
