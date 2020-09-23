import {MigrationInterface, QueryRunner} from "typeorm";

export class UserIdIndex1593477372597 implements MigrationInterface {
    name = 'UserIdIndex1593477372597'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_d72ea127f30e21753c9e229891" ON "user" ("userId") `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_d72ea127f30e21753c9e229891"`, undefined);
    }

}
