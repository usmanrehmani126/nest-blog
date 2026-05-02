import { MigrationInterface, QueryRunner } from "typeorm";

export class SetDefaultValueForArticleTitle1777738260976 implements MigrationInterface {
    name = 'SetDefaultValueForArticleTitle1777738260976'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "title" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "title" DROP DEFAULT`);
    }

}
