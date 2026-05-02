import { MigrationInterface, QueryRunner } from "typeorm";

export class SetDefaultValueForArticle1777666971476 implements MigrationInterface {
    name = 'SetDefaultValueForArticle1777666971476'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "description" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "description" DROP DEFAULT`);
    }

}
