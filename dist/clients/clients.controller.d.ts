import { ClientService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
export declare class ClientController {
    private readonly service;
    constructor(service: ClientService);
    create(createDto: CreateClientDto): Promise<import("./entities/client.entity").Client>;
    findAll(skip?: string, take?: string): Promise<[import("./entities/client.entity").Client[], number]>;
    findByUserId(userId: string): Promise<import("./entities/client.entity").Client>;
    findOne(id: string): Promise<import("./entities/client.entity").Client>;
    update(id: string, updateDto: UpdateClientDto): Promise<import("./entities/client.entity").Client>;
    remove(id: string): Promise<void>;
}
