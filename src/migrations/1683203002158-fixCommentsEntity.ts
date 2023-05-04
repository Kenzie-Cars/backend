import { MigrationInterface, QueryRunner } from "typeorm";

export class fixCommentsEntity1683203002158 implements MigrationInterface {
    name = 'fixCommentsEntity1683203002158'

    public async up(queryRunner: QueryRunner): Promise<void> {
       
        await queryRunner.query(`ALTER TABLE "users_advertisements" ALTER COLUMN "updated_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_advertisements" ALTER COLUMN "updated_at" SET DEFAULT now()`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_advertisements" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users_advertisements" ALTER COLUMN "updated_at" DROP NOT NULL`);
    }

}
