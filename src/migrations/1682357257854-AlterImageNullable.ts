import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterImageNullable1682357257854 implements MigrationInterface {
    name = 'AlterImageNullable1682357257854'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" ALTER COLUMN "image1" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" ALTER COLUMN "image2" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" ALTER COLUMN "image3" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" ALTER COLUMN "image4" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" ALTER COLUMN "image5" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" ALTER COLUMN "image6" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" ALTER COLUMN "image6" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" ALTER COLUMN "image5" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" ALTER COLUMN "image4" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" ALTER COLUMN "image3" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" ALTER COLUMN "image2" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" ALTER COLUMN "image1" SET NOT NULL`);
    }

}
