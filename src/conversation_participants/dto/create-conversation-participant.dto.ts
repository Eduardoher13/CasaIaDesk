import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateConversationParticipantDto {
  @IsNotEmpty()
  @IsUUID()
  conversation_id: string;

  @IsNotEmpty()
  @IsUUID()
  user_id: string;
}
