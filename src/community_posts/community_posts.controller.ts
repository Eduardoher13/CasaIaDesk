import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CommunityPostService } from './community_posts.service';
import { CreateCommunityPostDto } from './dto/create-community-post.dto';
import { UpdateCommunityPostDto } from './dto/update-community-post.dto';

@Controller('community-posts')
export class CommunityPostController {
  constructor(private readonly service: CommunityPostService) {}

  @Post()
  create(@Body() createDto: CreateCommunityPostDto) {
    return this.service.create(createDto);
  }

  @Get()
  findAll(@Query() filters: PaginationQueryDto) {
    return this.service.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateCommunityPostDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
