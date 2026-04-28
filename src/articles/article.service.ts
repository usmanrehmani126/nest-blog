import { UserEntity } from "@/user/entity/user.entity";
import { Injectable } from "@nestjs/common";
import { CreateArticleDto } from "./dto/createArticle.dto";


@Injectable()
export class ArticleService {
    constructor(){}

    async createArticle(user:UserEntity,createArticleDTO:CreateArticleDto){
        // 2:53:42
    }
}