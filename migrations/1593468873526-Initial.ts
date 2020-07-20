import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1593468873526 implements MigrationInterface {
    name = 'Initial1593468873526'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user" ("id" BIGSERIAL NOT NULL, "userId" character varying(10) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "url" ("id" BIGSERIAL NOT NULL, "url" character varying(250) NOT NULL, "shortUrl" character varying(20) NOT NULL, "hits" integer NOT NULL, "userId" bigint, CONSTRAINT "PK_7421088122ee64b55556dfc3a91" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "url" ADD CONSTRAINT "FK_2919f59acab0f44b9a244d35bdb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "url" DROP CONSTRAINT "FK_2919f59acab0f44b9a244d35bdb"`, undefined);
        await queryRunner.query(`DROP TABLE "url"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
    }

}
