import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdatePostCommentDto {
  @IsOptional()
  @IsUUID()
  post_id?: string;

  @IsOptional()
  @IsUUID()
  user_id?: string;

  @IsOptional()
  @IsString()
  content?: string;
}
