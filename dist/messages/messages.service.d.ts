import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
export declare class MessageService {
    private readonly repository;
    constructor(repository: Repository<Message>);
    create(createDto: CreateMessageDto): Promise<Message>;
    findAll(skip?: number, take?: number): Promise<[Message[], number]>;
    findOne(id: string): Promise<Message>;
    update(id: string, updateDto: UpdateMessageDto): Promise<Message>;
    remove(id: string): Promise<void>;
}
