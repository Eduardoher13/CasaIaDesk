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
exports.ProfessionalSpecialtyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pagination_util_1 = require("../common/pagination/pagination.util");
const professional_specialty_entity_1 = require("./entities/professional-specialty.entity");
let ProfessionalSpecialtyService = class ProfessionalSpecialtyService {
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
            .createQueryBuilder('professionalSpecialty')
            .take(limit)
            .skip(offset);
        qb.orderBy('professionalSpecialty.id', 'DESC');
        const [data, total] = await qb.getManyAndCount();
        return (0, pagination_util_1.toPaginatedResult)(data, total, limit, offset);
    }
    async findOne(professional_id, specialty_id) {
        const entity = await this.repository.findOne({ where: { professional_id, specialty_id } });
        if (!entity)
            throw new common_1.NotFoundException('ProfessionalSpecialty not found');
        return entity;
    }
    async update(professional_id, specialty_id, updateDto) {
        const entity = await this.findOne(professional_id, specialty_id);
        Object.assign(entity, updateDto);
        return this.repository.save(entity);
    }
    async remove(professional_id, specialty_id) {
        const entity = await this.findOne(professional_id, specialty_id);
        await this.repository.remove(entity);
    }
};
exports.ProfessionalSpecialtyService = ProfessionalSpecialtyService;
exports.ProfessionalSpecialtyService = ProfessionalSpecialtyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(professional_specialty_entity_1.ProfessionalSpecialty)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProfessionalSpecialtyService);
//# sourceMappingURL=professional_specialties.service.js.map