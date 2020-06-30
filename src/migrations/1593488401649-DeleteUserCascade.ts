import {MigrationInterface, QueryRunner} from "typeorm";

export class DeleteUserCascade1593488401649 implements MigrationInterface {
    name = 'DeleteUserCascade1593488401649'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "url" DROP CONSTRAINT "FK_2919f59acab0f44b9a244d35bdb"`, undefined);
        await queryRunner.query(`ALTER TABLE "url" ADD CONSTRAINT "FK_2919f59acab0f44b9a244d35bdb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "url" DROP CONSTRAINT "FK_2919f59acab0f44b9a244d35bdb"`, undefined);
        await queryRunner.query(`ALTER TABLE "url" ADD CONSTRAINT "FK_2919f59acab0f44b9a244d35bdb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
