import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePostCommentDto {
  @IsNotEmpty()
  @IsUUID()
  post_id: string;

  @IsNotEmpty()
  @IsUUID()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
