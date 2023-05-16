import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterImageTable1682356619131 implements MigrationInterface {
    name = 'AlterImageTable1682356619131'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "url"`);
        await queryRunner.query(`ALTER TABLE "images" ADD "image1" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" ADD "image2" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" ADD "image3" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" ADD "image4" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" ADD "image5" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" ADD "image6" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "image6"`);
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "image5"`);
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "image4"`);
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "image3"`);
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "image2"`);
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "image1"`);
        await queryRunner.query(`ALTER TABLE "images" ADD "url" character varying NOT NULL`);
    }

}
