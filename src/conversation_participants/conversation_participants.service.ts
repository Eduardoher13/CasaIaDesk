import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { toPaginatedResult } from '../common/pagination/pagination.util';
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

  async findAll(filters: PaginationQueryDto) {
    const { limit = 10, offset = 0 } = filters;

    const qb = this.repository
      .createQueryBuilder('conversationParticipant')
      .take(limit)
      .skip(offset);

    qb.orderBy('conversationParticipant.id', 'DESC');

    const [data, total] = await qb.getManyAndCount();
    return toPaginatedResult(data, total, limit, offset);
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
