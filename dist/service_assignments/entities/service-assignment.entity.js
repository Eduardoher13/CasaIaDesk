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
exports.ServiceAssignment = void 0;
const typeorm_1 = require("typeorm");
const service_request_entity_1 = require("../../service_requests/entities/service-request.entity");
const service_offer_entity_1 = require("../../service_offers/entities/service-offer.entity");
const professional_entity_1 = require("../../professionals/entities/professional.entity");
const client_entity_1 = require("../../clients/entities/client.entity");
let ServiceAssignment = class ServiceAssignment {
    id;
    service_request_id;
    service_offer_id;
    professional_id;
    client_id;
    final_price;
    started_at;
    completed_at;
    service_request;
    service_offer;
    professional;
    client;
};
exports.ServiceAssignment = ServiceAssignment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ServiceAssignment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'service_request_id', type: 'uuid', unique: true }),
    __metadata("design:type", String)
], ServiceAssignment.prototype, "service_request_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'service_offer_id', type: 'uuid', unique: true }),
    __metadata("design:type", String)
], ServiceAssignment.prototype, "service_offer_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'professional_id', type: 'uuid' }),
    __metadata("design:type", String)
], ServiceAssignment.prototype, "professional_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'client_id', type: 'uuid' }),
    __metadata("design:type", String)
], ServiceAssignment.prototype, "client_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'final_price', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ServiceAssignment.prototype, "final_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'started_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], ServiceAssignment.prototype, "started_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'completed_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], ServiceAssignment.prototype, "completed_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => service_request_entity_1.ServiceRequest),
    (0, typeorm_1.JoinColumn)({ name: 'service_request_id' }),
    __metadata("design:type", service_request_entity_1.ServiceRequest)
], ServiceAssignment.prototype, "service_request", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => service_offer_entity_1.ServiceOffer),
    (0, typeorm_1.JoinColumn)({ name: 'service_offer_id' }),
    __metadata("design:type", service_offer_entity_1.ServiceOffer)
], ServiceAssignment.prototype, "service_offer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => professional_entity_1.Professional),
    (0, typeorm_1.JoinColumn)({ name: 'professional_id' }),
    __metadata("design:type", professional_entity_1.Professional)
], ServiceAssignment.prototype, "professional", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_entity_1.Client),
    (0, typeorm_1.JoinColumn)({ name: 'client_id' }),
    __metadata("design:type", client_entity_1.Client)
], ServiceAssignment.prototype, "client", void 0);
exports.ServiceAssignment = ServiceAssignment = __decorate([
    (0, typeorm_1.Entity)({ name: 'service_assignments' })
], ServiceAssignment);
//# sourceMappingURL=service-assignment.entity.js.map