import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1683810504168 implements MigrationInterface {
    name = 'Migrations1683810504168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "userColor" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "userColor"`);
    }

}
