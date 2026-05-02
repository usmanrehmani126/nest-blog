import { MigrationInterface, QueryRunner } from "typeorm";

export class SetDefaultValueForArticleBody1777734487791 implements MigrationInterface {
    name = 'SetDefaultValueForArticleBody1777734487791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ADD "body" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "body"`);
    }

}
