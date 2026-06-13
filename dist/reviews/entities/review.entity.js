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
exports.Review = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const service_assignment_entity_1 = require("../../service_assignments/entities/service-assignment.entity");
const product_entity_1 = require("../../products/entities/product.entity");
let Review = class Review {
    id;
    reviewer_id;
    service_assignment_id;
    product_id;
    rating;
    comment;
    created_at;
    reviewer;
    service_assignment;
    product;
};
exports.Review = Review;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Review.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reviewer_id', type: 'uuid' }),
    __metadata("design:type", String)
], Review.prototype, "reviewer_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'service_assignment_id', type: 'uuid' }),
    __metadata("design:type", Object)
], Review.prototype, "service_assignment_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_id', type: 'uuid' }),
    __metadata("design:type", Object)
], Review.prototype, "product_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint' }),
    __metadata("design:type", Number)
], Review.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Review.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Review.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'reviewer_id' }),
    __metadata("design:type", user_entity_1.User)
], Review.prototype, "reviewer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => service_assignment_entity_1.ServiceAssignment, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'service_assignment_id' }),
    __metadata("design:type", Object)
], Review.prototype, "service_assignment", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", Object)
], Review.prototype, "product", void 0);
exports.Review = Review = __decorate([
    (0, typeorm_1.Entity)({ name: 'reviews' })
], Review);
//# sourceMappingURL=review.entity.js.map