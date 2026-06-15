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
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pagination_util_1 = require("../common/pagination/pagination.util");
const company_entity_1 = require("./entities/company.entity");
const product_entity_1 = require("../products/entities/product.entity");
let CompanyService = class CompanyService {
    repository;
    productRepository;
    constructor(repository, productRepository) {
        this.repository = repository;
        this.productRepository = productRepository;
    }
    create(createDto) {
        const entity = this.repository.create(createDto);
        return this.repository.save(entity);
    }
    async findAll(filters) {
        const { limit = 10, offset = 0 } = filters;
        const qb = this.repository
            .createQueryBuilder('company')
            .take(limit)
            .skip(offset);
        qb.orderBy('company.id', 'DESC');
        const [data, total] = await qb.getManyAndCount();
        return (0, pagination_util_1.toPaginatedResult)(data, total, limit, offset);
    }
    async findByUserId(userId) {
        const company = await this.repository.findOne({
            where: { user_id: userId },
        });
        if (!company) {
            throw new common_1.NotFoundException(`Company for user ${userId} not found`);
        }
        return company;
    }
    async getStorefront(id, filters) {
        const { limit = 10, offset = 0 } = filters;
        const company = await this.findOne(id);
        const qb = this.productRepository
            .createQueryBuilder('product')
            .where('product.company_id = :companyId', { companyId: id })
            .andWhere('product.is_active = :isActive', { isActive: true })
            .take(limit)
            .skip(offset);
        qb.orderBy('product.name', 'ASC').addOrderBy('product.id', 'DESC');
        const [products, total] = await qb.getManyAndCount();
        return {
            company,
            products: (0, pagination_util_1.toPaginatedResult)(products, total, limit, offset),
        };
    }
    async findOne(id) {
        const entity = await this.repository.findOne({ where: { id } });
        if (!entity)
            throw new common_1.NotFoundException('Company #' + id + ' not found');
        return entity;
    }
    async update(id, updateDto) {
        const entity = await this.findOne(id);
        Object.assign(entity, updateDto);
        return this.repository.save(entity);
    }
    async remove(id) {
        const entity = await this.findOne(id);
        await this.repository.remove(entity);
    }
};
exports.CompanyService = CompanyService;
exports.CompanyService = CompanyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(company_entity_1.Company)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CompanyService);
//# sourceMappingURL=companies.service.js.map