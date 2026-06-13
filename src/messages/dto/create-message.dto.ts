import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsUUID()
  conversation_id: string;

  @IsNotEmpty()
  @IsUUID()
  sender_id: string;

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
