import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ConversationParticipantService } from './conversation_participants.service';
import { CreateConversationParticipantDto } from './dto/create-conversation-participant.dto';
import { UpdateConversationParticipantDto } from './dto/update-conversation-participant.dto';

@Controller('conversation-participants')
export class ConversationParticipantController {
  constructor(private readonly service: ConversationParticipantService) {}

  @Post()
  create(@Body() createDto: CreateConversationParticipantDto) {
    return this.service.create(createDto);
  }

  @Get()
  findAll(@Query() filters: PaginationQueryDto) {
    return this.service.findAll(filters);
  }

  @Get(':conversation_id/:user_id')
  findOne(@Param('conversation_id') conversation_id: string, @Param('user_id') user_id: string) {
    return this.service.findOne(conversation_id, user_id);
  }

  @Patch(':conversation_id/:user_id')
  update(@Param('conversation_id') conversation_id: string, @Param('user_id') user_id: string, @Body() updateDto: UpdateConversationParticipantDto) {
    return this.service.update(conversation_id, user_id, updateDto);
  }

  @Delete(':conversation_id/:user_id')
  remove(@Param('conversation_id') conversation_id: string, @Param('user_id') user_id: string) {
    return this.service.remove(conversation_id, user_id);
  }
}
