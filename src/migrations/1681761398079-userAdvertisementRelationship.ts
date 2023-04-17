import { MigrationInterface, QueryRunner } from "typeorm";

export class userAdvertisementRelationship1681761398079 implements MigrationInterface {
    name = 'userAdvertisementRelationship1681761398079'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_4c0f1584b30c8775ac95bd6f644"`);
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "imagesId"`);
        await queryRunner.query(`ALTER TABLE "images" ADD "advertisementId" uuid`);
        await queryRunner.query(`ALTER TABLE "advertisements" ADD "year" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "advertisements" ADD "cover_img" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_b70fa3486870bb59477e9505ca0" FOREIGN KEY ("advertisementId") REFERENCES "advertisements"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_b70fa3486870bb59477e9505ca0"`);
        await queryRunner.query(`ALTER TABLE "advertisements" DROP COLUMN "cover_img"`);
        await queryRunner.query(`ALTER TABLE "advertisements" DROP COLUMN "year"`);
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "advertisementId"`);
        await queryRunner.query(`ALTER TABLE "images" ADD "imagesId" uuid`);
        await queryRunner.query(`ALTER TABLE "images" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_4c0f1584b30c8775ac95bd6f644" FOREIGN KEY ("imagesId") REFERENCES "advertisements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
