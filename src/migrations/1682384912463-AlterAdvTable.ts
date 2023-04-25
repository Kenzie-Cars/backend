import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterAdvTable1682384912463 implements MigrationInterface {
    name = 'AlterAdvTable1682384912463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisements" DROP CONSTRAINT "FK_5b3a17dd0adeba4fbb27d977304"`);
        await queryRunner.query(`ALTER TABLE "advertisements" DROP COLUMN "FIPE_price"`);
        await queryRunner.query(`ALTER TABLE "advertisements" ADD "is_goodSale" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "advertisements" ADD "is_active" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "advertisements" ADD CONSTRAINT "FK_5b3a17dd0adeba4fbb27d977304" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisements" DROP CONSTRAINT "FK_5b3a17dd0adeba4fbb27d977304"`);
        await queryRunner.query(`ALTER TABLE "advertisements" DROP COLUMN "is_active"`);
        await queryRunner.query(`ALTER TABLE "advertisements" DROP COLUMN "is_goodSale"`);
        await queryRunner.query(`ALTER TABLE "advertisements" ADD "FIPE_price" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "advertisements" ADD CONSTRAINT "FK_5b3a17dd0adeba4fbb27d977304" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
