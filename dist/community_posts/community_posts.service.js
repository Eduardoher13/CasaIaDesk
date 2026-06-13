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
exports.CommunityPostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const community_post_entity_1 = require("./entities/community-post.entity");
let CommunityPostService = class CommunityPostService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    create(createDto) {
        const entity = this.repository.create(createDto);
        return this.repository.save(entity);
    }
    findAll(skip = 0, take = 10) {
        return this.repository.findAndCount({ skip, take });
    }
    async findOne(id) {
        const entity = await this.repository.findOne({ where: { id } });
        if (!entity)
            throw new common_1.NotFoundException('CommunityPost #' + id + ' not found');
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
exports.CommunityPostService = CommunityPostService;
exports.CommunityPostService = CommunityPostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(community_post_entity_1.CommunityPost)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CommunityPostService);
//# sourceMappingURL=community_posts.service.js.map