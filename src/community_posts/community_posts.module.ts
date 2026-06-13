import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityPost } from './entities/community-post.entity';
import { CommunityPostService } from './community_posts.service';
import { CommunityPostController } from './community_posts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CommunityPost])],
  controllers: [CommunityPostController],
  providers: [CommunityPostService],
  exports: [CommunityPostService],
})
export class CommunityPostModule {}
