import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateMessageDto {
  @IsOptional()
  @IsUUID()
  conversation_id?: string;

  @IsOptional()
  @IsUUID()
  sender_id?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  file_url?: string;

  @IsOptional()
  @IsBoolean()
  is_read?: boolean;
}
