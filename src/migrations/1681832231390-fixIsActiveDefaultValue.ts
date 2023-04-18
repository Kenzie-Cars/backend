import { MigrationInterface, QueryRunner } from "typeorm";

export class fixIsActiveDefaultValue1681832231390 implements MigrationInterface {
    name = 'fixIsActiveDefaultValue1681832231390'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "is_active" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "is_active" DROP DEFAULT`);
    }

}
