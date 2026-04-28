import { Module } from "@nestjs/common";
import { ArticleController } from "./article.controller";
import { ArticleService } from "./article.service";

@Module({
    controllers:[ArticleController],
    providers:[ArticleService],
    exports:[]
})

export class ArticleModule {

}