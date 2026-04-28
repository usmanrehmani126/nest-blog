import { Controller, Get } from "@nestjs/common";


@Controller('articles')
export class ArticleController {
    constructor(){}

    @Get('getAllArticles')
    async getAllArticles(){
        return "Articles are get!"
    }
}
