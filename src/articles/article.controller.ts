import { ArticleService } from '@/articles/article.service';
import { CreateArticleDto } from '@/articles/dto/createArticle.dto';
import { IArticleResponse } from '@/articles/types/articlesResponse.interface';
import { CustomUserDecorator } from '@/user/decorators/user.decorators';
import { UserEntity } from '@/user/entity/user.entity';
import { AuthGuard } from '@/user/guards/auth.guards';
import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('createArticle')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  async getAllArticles(
    @CustomUserDecorator() user: UserEntity,
    @Body('article') createArticleDTO: CreateArticleDto,
  ): Promise<IArticleResponse> {
    const newArticle = await this.articleService.createArticle(
      user,
      createArticleDTO,
    );
    return this.articleService.generateArticleResponse(newArticle);
  }
}
