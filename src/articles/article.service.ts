import { UserEntity } from '@/user/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/createArticle.dto';
import { ArticleEntity } from '@/articles/entity/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IArticleResponse } from '@/articles/types/articlesResponse.interface';
import slugify from "slugify"
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async createArticle(
    user: UserEntity,
    createArticleDTO: CreateArticleDto,
  ): Promise<ArticleEntity> {
    const article = new ArticleEntity();
    Object.assign(article, createArticleDTO);
    if (!article?.tagList) {
      article.tagList = [];
    }

    article.slug = this.generateSlug(article.title);
    article.author = user;

    return await this.articleRepository.save(article);
  }

  generateSlug(title:string):string{
   const id=Date.now().toString(36) + Math.random().toString(36).slice(2);
    return `${slugify(title,{lower:true})}-${id}`;
  }

  generateArticleResponse(article: ArticleEntity): IArticleResponse {
    return {
        article
    }
  }
}
