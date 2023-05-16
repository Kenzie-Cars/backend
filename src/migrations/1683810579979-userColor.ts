import { MigrationInterface, QueryRunner } from "typeorm";

export class UserColor1683810579979 implements MigrationInterface {
    name = 'UserColor1683810579979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "userColor" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "userColor"`);
    }

}
