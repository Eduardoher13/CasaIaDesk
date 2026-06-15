import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { PostCommentService } from './post_comments.service';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { UpdatePostCommentDto } from './dto/update-post-comment.dto';

@Controller('post-comments')
export class PostCommentController {
  constructor(private readonly service: PostCommentService) {}

  @Post()
  create(@Body() createDto: CreatePostCommentDto) {
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
  update(@Param('id') id: string, @Body() updateDto: UpdatePostCommentDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
