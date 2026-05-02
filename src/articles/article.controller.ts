import { ArticleService } from '@/articles/article.service';
import { CreateArticleDto } from '@/articles/dto/createArticle.dto';
import { IArticleResponse } from '@/articles/types/articlesResponse.interface';
import { CustomUserDecorator } from '@/user/decorators/user.decorators';
import { UserEntity } from '@/user/entity/user.entity';
import { AuthGuard } from '@/user/guards/auth.guards';
import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('createArticle')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  async createArticle(
    @CustomUserDecorator() user: UserEntity,
    @Body('article') createArticleDTO: CreateArticleDto,
  ): Promise<IArticleResponse> {
    const newArticle = await this.articleService.createArticle(
      user,
      createArticleDTO,
    );
    return this.articleService.generateArticleResponse(newArticle);
  }

  @Get(':slug')
  async getArticles(@Param('slug') slug:string):Promise<IArticleResponse>{
   const article=await this.articleService.getArticle(slug)
   return this.articleService.generateArticleResponse(article)
  }
}
