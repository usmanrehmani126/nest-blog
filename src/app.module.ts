import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { tagModule } from './tag/tag.module';
import ormConfig from './ormconfig';
import { UserModule } from '@/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ArticleModule } from './articles/article.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    tagModule,
    UserModule,
    ArticleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
