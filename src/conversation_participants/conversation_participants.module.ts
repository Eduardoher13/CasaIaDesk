import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationParticipant } from './entities/conversation-participant.entity';
import { ConversationParticipantService } from './conversation_participants.service';
import { ConversationParticipantController } from './conversation_participants.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ConversationParticipant])],
  controllers: [ConversationParticipantController],
  providers: [ConversationParticipantService],
  exports: [ConversationParticipantService],
})
export class ConversationParticipantModule {}
