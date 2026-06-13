import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConversationParticipant } from './entities/conversation-participant.entity';
import { CreateConversationParticipantDto } from './dto/create-conversation-participant.dto';
import { UpdateConversationParticipantDto } from './dto/update-conversation-participant.dto';

@Injectable()
export class ConversationParticipantService {
  constructor(
    @InjectRepository(ConversationParticipant)
    private readonly repository: Repository<ConversationParticipant>,
  ) {}

  create(createDto: CreateConversationParticipantDto) {
    const entity = this.repository.create(createDto);
    return this.repository.save(entity);
  }

  findAll(skip = 0, take = 10) {
    return this.repository.findAndCount({ skip, take });
  }

  async findOne(conversation_id: string, user_id: string) {
    const entity = await this.repository.findOne({ where: { conversation_id, user_id } });
    if (!entity) throw new NotFoundException('ConversationParticipant not found');
    return entity;
  }

  async update(conversation_id: string, user_id: string, updateDto: UpdateConversationParticipantDto) {
    const entity = await this.findOne(conversation_id, user_id);
    Object.assign(entity, updateDto);
    return this.repository.save(entity);
  }

  async remove(conversation_id: string, user_id: string) {
    const entity = await this.findOne(conversation_id, user_id);
    await this.repository.remove(entity);
  }
}
