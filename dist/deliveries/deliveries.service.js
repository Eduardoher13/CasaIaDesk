"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pagination_util_1 = require("../common/pagination/pagination.util");
const delivery_entity_1 = require("./entities/delivery.entity");
let DeliveryService = class DeliveryService {
    repository;
    configService;
    constructor(repository, configService) {
        this.repository = repository;
        this.configService = configService;
    }
    create(createDto) {
        const entity = this.repository.create(createDto);
        return this.repository.save(entity);
    }
    async findAll(filters) {
        const { limit = 10, offset = 0 } = filters;
        const qb = this.repository
            .createQueryBuilder('delivery')
            .take(limit)
            .skip(offset);
        qb.orderBy('delivery.created_at', 'DESC').addOrderBy('delivery.id', 'DESC');
        const [data, total] = await qb.getManyAndCount();
        return (0, pagination_util_1.toPaginatedResult)(data, total, limit, offset);
    }
    async findOne(id) {
        const entity = await this.repository.findOne({ where: { id } });
        if (!entity)
            throw new common_1.NotFoundException('Delivery #' + id + ' not found');
        return entity;
    }
    async update(id, updateDto) {
        const entity = await this.findOne(id);
        if (updateDto.status === 'entregado' && !updateDto.completed_at && !entity.completed_at) {
            updateDto.completed_at = new Date().toISOString();
        }
        Object.assign(entity, updateDto);
        return this.repository.save(entity);
    }
    async remove(id) {
        const entity = await this.findOne(id);
        await this.repository.remove(entity);
    }
    async getDirections(query) {
        const apiKey = this.configService.get('GOOGLE_MAPS_API_KEY');
        if (!apiKey) {
            throw new common_1.InternalServerErrorException('GOOGLE_MAPS_API_KEY no configurada en el backend');
        }
        const origin = `${query.fromLat},${query.fromLng}`;
        const destination = `${query.toLat},${query.toLng}`;
        const url = 'https://maps.googleapis.com/maps/api/directions/json' +
            `?origin=${origin}&destination=${destination}` +
            `&mode=driving&key=${apiKey}`;
        let response;
        try {
            response = await fetch(url);
        }
        catch {
            throw new common_1.ServiceUnavailableException('No se pudo contactar a Google Directions');
        }
        if (!response.ok) {
            throw new common_1.ServiceUnavailableException(`Google Directions respondió ${response.status}`);
        }
        const data = (await response.json());
        if (data.status !== 'OK' || data.routes.length === 0) {
            throw new common_1.ServiceUnavailableException(`Google Directions: ${data.error_message ?? data.status}`);
        }
        const route = data.routes[0];
        const leg = route.legs?.[0];
        return {
            polyline_encoded: route.overview_polyline?.points ?? null,
            distance_meters: leg?.distance?.value ?? null,
            duration_seconds: leg?.duration?.value ?? null,
        };
    }
};
exports.DeliveryService = DeliveryService;
exports.DeliveryService = DeliveryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(delivery_entity_1.Delivery)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], DeliveryService);
//# sourceMappingURL=deliveries.service.js.map