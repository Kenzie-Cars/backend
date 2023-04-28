import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePasswordResetToken1682682965227 implements MigrationInterface {
    name = 'CreatePasswordResetToken1682682965227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "passwordResetToken" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_bffe933a388d6bde48891ff95ab" UNIQUE ("passwordResetToken")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "passwordResetedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "is_adm" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "is_adm" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "passwordResetedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_bffe933a388d6bde48891ff95ab"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "passwordResetToken"`);
    }

}
