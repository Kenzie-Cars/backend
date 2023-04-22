import { MigrationInterface, QueryRunner } from "typeorm";

export class fixAdvertisementEntity1682080402875 implements MigrationInterface {
    name = 'fixAdvertisementEntity1682080402875'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisements" ALTER COLUMN "updated_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "advertisements" ALTER COLUMN "updated_at" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisements" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "advertisements" ALTER COLUMN "updated_at" DROP NOT NULL`);
    }

}
