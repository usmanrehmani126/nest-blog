import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}
  @Get()
  async getAllTags() {
    const allTags = await this.tagService.getAll();
    const tags: string[] = allTags.map((tg) => tg.name);
    return { tags };
  }
}
