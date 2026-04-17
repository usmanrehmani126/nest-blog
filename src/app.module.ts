import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { tagModule } from './tag/tag.module';
import ormConfig from './ormconfig';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), tagModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 
