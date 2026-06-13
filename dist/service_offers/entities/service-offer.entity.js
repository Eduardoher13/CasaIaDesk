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
exports.ServiceOffer = void 0;
const typeorm_1 = require("typeorm");
const service_request_entity_1 = require("../../service_requests/entities/service-request.entity");
const professional_entity_1 = require("../../professionals/entities/professional.entity");
let ServiceOffer = class ServiceOffer {
    id;
    service_request_id;
    professional_id;
    price;
    message;
    is_accepted;
    created_at;
    service_request;
    professional;
};
exports.ServiceOffer = ServiceOffer;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ServiceOffer.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'service_request_id', type: 'uuid', unique: true }),
    __metadata("design:type", String)
], ServiceOffer.prototype, "service_request_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'professional_id', type: 'uuid' }),
    __metadata("design:type", String)
], ServiceOffer.prototype, "professional_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ServiceOffer.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ServiceOffer.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_accepted', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ServiceOffer.prototype, "is_accepted", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], ServiceOffer.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => service_request_entity_1.ServiceRequest, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'service_request_id' }),
    __metadata("design:type", service_request_entity_1.ServiceRequest)
], ServiceOffer.prototype, "service_request", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => professional_entity_1.Professional),
    (0, typeorm_1.JoinColumn)({ name: 'professional_id' }),
    __metadata("design:type", professional_entity_1.Professional)
], ServiceOffer.prototype, "professional", void 0);
exports.ServiceOffer = ServiceOffer = __decorate([
    (0, typeorm_1.Entity)({ name: 'service_offers' })
], ServiceOffer);
//# sourceMappingURL=service-offer.entity.js.map