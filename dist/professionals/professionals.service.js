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
exports.ProfessionalService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pagination_util_1 = require("../common/pagination/pagination.util");
const professional_entity_1 = require("./entities/professional.entity");
let ProfessionalService = class ProfessionalService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    create(createDto) {
        const entity = this.repository.create(createDto);
        return this.repository.save(entity);
    }
    async findAll(filters) {
        const { limit = 10, offset = 0 } = filters;
        const qb = this.repository
            .createQueryBuilder('professional')
            .take(limit)
            .skip(offset);
        qb.orderBy('professional.id', 'DESC');
        const [data, total] = await qb.getManyAndCount();
        return (0, pagination_util_1.toPaginatedResult)(data, total, limit, offset);
    }
    async findByUserId(userId) {
        const professional = await this.repository.findOne({
            where: { user_id: userId },
            relations: { user: true },
        });
        if (!professional) {
            throw new common_1.NotFoundException(`Professional for user ${userId} not found`);
        }
        return this.sanitizeProfessional(professional);
    }
    async findAvailable(filters) {
        const { limit = 10, offset = 0 } = filters;
        const qb = this.repository
            .createQueryBuilder('professional')
            .leftJoinAndSelect('professional.user', 'user')
            .where('professional.is_available = :isAvailable', { isAvailable: true })
            .take(limit)
            .skip(offset);
        qb.orderBy('professional.avg_rating', 'DESC').addOrderBy('professional.id', 'DESC');
        const [rows, total] = await qb.getManyAndCount();
        const data = rows.map((p) => this.sanitizeProfessional(p));
        return (0, pagination_util_1.toPaginatedResult)(data, total, limit, offset);
    }
    async findBySpecialtySlug(slug, filters) {
        const { limit = 10, offset = 0 } = filters;
        const qb = this.repository
            .createQueryBuilder('professional')
            .leftJoinAndSelect('professional.user', 'user')
            .innerJoin('professional_specialties', 'ps', 'ps.professional_id = professional.id')
            .innerJoin('specialties', 'specialty', 'specialty.id = ps.specialty_id')
            .where('specialty.slug = :slug', { slug })
            .andWhere('professional.is_available = :isAvailable', { isAvailable: true })
            .take(limit)
            .skip(offset);
        qb.orderBy('professional.avg_rating', 'DESC').addOrderBy('professional.id', 'DESC');
        const [rows, total] = await qb.getManyAndCount();
        const data = rows.map((p) => this.sanitizeProfessional(p));
        return (0, pagination_util_1.toPaginatedResult)(data, total, limit, offset);
    }
    async findOne(id) {
        const entity = await this.repository.findOne({
            where: { id },
            relations: { user: true },
        });
        if (!entity)
            throw new common_1.NotFoundException('Professional #' + id + ' not found');
        return this.sanitizeProfessional(entity);
    }
    async findOneEntity(id) {
        const entity = await this.repository.findOne({ where: { id } });
        if (!entity)
            throw new common_1.NotFoundException('Professional #' + id + ' not found');
        return entity;
    }
    async update(id, updateDto) {
        const entity = await this.findOneEntity(id);
        Object.assign(entity, updateDto);
        return this.repository.save(entity);
    }
    async remove(id) {
        const entity = await this.findOneEntity(id);
        await this.repository.remove(entity);
    }
    sanitizeProfessional(professional) {
        if (!professional.user)
            return professional;
        const { password_hash: _, ...user } = professional.user;
        return { ...professional, user };
    }
};
exports.ProfessionalService = ProfessionalService;
exports.ProfessionalService = ProfessionalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(professional_entity_1.Professional)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProfessionalService);
//# sourceMappingURL=professionals.service.js.map