import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from './tag.entity';

import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity])],
  controllers: [TagController],
  providers: [TagService],
  exports: [],
})
export class tagModule {}
