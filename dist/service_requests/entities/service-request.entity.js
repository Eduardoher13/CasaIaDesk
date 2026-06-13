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
exports.ServiceRequest = void 0;
const typeorm_1 = require("typeorm");
const client_entity_1 = require("../../clients/entities/client.entity");
const specialty_entity_1 = require("../../specialties/entities/specialty.entity");
let ServiceRequest = class ServiceRequest {
    id;
    client_id;
    specialty_id;
    title;
    description;
    address;
    status;
    is_emergency;
    preferred_date;
    created_at;
    client;
    specialty;
};
exports.ServiceRequest = ServiceRequest;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ServiceRequest.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'client_id', type: 'uuid' }),
    __metadata("design:type", String)
], ServiceRequest.prototype, "client_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'specialty_id', type: 'int' }),
    __metadata("design:type", Number)
], ServiceRequest.prototype, "specialty_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], ServiceRequest.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ServiceRequest.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ServiceRequest.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true, default: 'pendiente' }),
    __metadata("design:type", String)
], ServiceRequest.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_emergency', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ServiceRequest.prototype, "is_emergency", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'preferred_date', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], ServiceRequest.prototype, "preferred_date", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], ServiceRequest.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_entity_1.Client),
    (0, typeorm_1.JoinColumn)({ name: 'client_id' }),
    __metadata("design:type", client_entity_1.Client)
], ServiceRequest.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => specialty_entity_1.Specialty),
    (0, typeorm_1.JoinColumn)({ name: 'specialty_id' }),
    __metadata("design:type", specialty_entity_1.Specialty)
], ServiceRequest.prototype, "specialty", void 0);
exports.ServiceRequest = ServiceRequest = __decorate([
    (0, typeorm_1.Entity)({ name: 'service_requests' })
], ServiceRequest);
//# sourceMappingURL=service-request.entity.js.map