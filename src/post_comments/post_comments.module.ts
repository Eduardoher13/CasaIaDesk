import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostComment } from './entities/post-comment.entity';
import { PostCommentService } from './post_comments.service';
import { PostCommentController } from './post_comments.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PostComment])],
  controllers: [PostCommentController],
  providers: [PostCommentService],
  exports: [PostCommentService],
})
export class PostCommentModule {}
