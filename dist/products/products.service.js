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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pagination_util_1 = require("../common/pagination/pagination.util");
const product_entity_1 = require("./entities/product.entity");
let ProductService = class ProductService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    create(createDto) {
        const entity = this.repository.create(createDto);
        return this.repository.save(entity);
    }
    async findAll(filters) {
        const { limit = 10, offset = 0, q } = filters;
        const qb = this.repository
            .createQueryBuilder('product')
            .take(limit)
            .skip(offset);
        if (q?.trim()) {
            qb.leftJoinAndSelect('product.company', 'company');
            this.applyTextSearch(qb, q, { includeCompany: true });
        }
        qb.orderBy('product.name', 'ASC').addOrderBy('product.id', 'DESC');
        const [data, total] = await qb.getManyAndCount();
        return (0, pagination_util_1.toPaginatedResult)(data, total, limit, offset);
    }
    async findByCompany(companyId, filters) {
        const { limit = 50, offset = 0, q } = filters;
        const qb = this.repository
            .createQueryBuilder('product')
            .where('product.company_id = :companyId', { companyId })
            .andWhere('product.is_active = :isActive', { isActive: true })
            .take(limit)
            .skip(offset);
        this.applyTextSearch(qb, q, { includeCompany: false });
        qb.orderBy('product.name', 'ASC').addOrderBy('product.id', 'DESC');
        const [data, total] = await qb.getManyAndCount();
        return (0, pagination_util_1.toPaginatedResult)(data, total, limit, offset);
    }
    async findActive(filters) {
        const { limit = 20, offset = 0, q } = filters;
        const qb = this.repository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.company', 'company')
            .where('product.is_active = :isActive', { isActive: true })
            .take(limit)
            .skip(offset);
        this.applyTextSearch(qb, q, { includeCompany: true });
        qb.orderBy('product.name', 'ASC').addOrderBy('product.id', 'DESC');
        const [data, total] = await qb.getManyAndCount();
        return (0, pagination_util_1.toPaginatedResult)(data, total, limit, offset);
    }
    applyTextSearch(qb, q, options) {
        const term = q?.trim();
        if (!term) {
            return;
        }
        const search = `%${term}%`;
        const conditions = [
            'product.name ILIKE :search',
            'product.description ILIKE :search',
        ];
        if (options.includeCompany) {
            conditions.push('company.commercial_name ILIKE :search');
        }
        qb.andWhere(`(${conditions.join(' OR ')})`, { search });
    }
    async setImageUrl(id, imageUrl) {
        const product = await this.findOne(id);
        product.image_url = imageUrl;
        return this.repository.save(product);
    }
    async updateStock(id, delta) {
        const product = await this.findOne(id);
        const newStock = product.stock + delta;
        if (newStock < 0) {
            throw new common_1.BadRequestException('Stock cannot be negative');
        }
        product.stock = newStock;
        return this.repository.save(product);
    }
    async findOne(id) {
        const entity = await this.repository.findOne({ where: { id } });
        if (!entity)
            throw new common_1.NotFoundException('Product #' + id + ' not found');
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
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductService);
//# sourceMappingURL=products.service.js.map