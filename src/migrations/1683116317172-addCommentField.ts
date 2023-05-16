import { MigrationInterface, QueryRunner } from "typeorm";

export class addCommentField1683116317172 implements MigrationInterface {
    name = 'addCommentField1683116317172'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_advertisements" ADD "comment" character varying(500) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_advertisements" DROP COLUMN "comment"`);
    }

}
