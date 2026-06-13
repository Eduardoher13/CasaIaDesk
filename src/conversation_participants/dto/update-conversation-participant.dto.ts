import { IsOptional, IsUUID } from 'class-validator';

export class UpdateConversationParticipantDto {
  @IsOptional()
  @IsUUID()
  conversation_id?: string;

  @IsOptional()
  @IsUUID()
  user_id?: string;
}
