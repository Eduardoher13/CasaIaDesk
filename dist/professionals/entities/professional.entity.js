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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Professional = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
let Professional = class Professional {
    id;
    user_id;
    bio;
    years_experience;
    base_price;
    avg_rating;
    total_reviews;
    is_available;
    service_radius_km;
    user;
};
exports.Professional = Professional;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Professional.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'uuid', unique: true }),
    __metadata("design:type", String)
], Professional.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Professional.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'years_experience', type: 'smallint', default: 0 }),
    __metadata("design:type", Number)
], Professional.prototype, "years_experience", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'base_price', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Object)
], Professional.prototype, "base_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'avg_rating', type: 'decimal', precision: 3, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Professional.prototype, "avg_rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_reviews', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Professional.prototype, "total_reviews", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_available', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Professional.prototype, "is_available", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'service_radius_km', type: 'decimal', precision: 6, scale: 2, default: 20 }),
    __metadata("design:type", Number)
], Professional.prototype, "service_radius_km", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Professional.prototype, "user", void 0);
exports.Professional = Professional = __decorate([
    (0, typeorm_1.Entity)({ name: 'professionals' })
], Professional);
//# sourceMappingURL=professional.entity.js.map