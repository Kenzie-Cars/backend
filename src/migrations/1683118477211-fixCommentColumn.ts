import { MigrationInterface, QueryRunner } from "typeorm";

export class fixCommentColumn1683118477211 implements MigrationInterface {
    name = 'fixCommentColumn1683118477211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_advertisements" ALTER COLUMN "comment" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_advertisements" ALTER COLUMN "comment" SET NOT NULL`);
    }

}
