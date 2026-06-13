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
exports.Transaction = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const order_entity_1 = require("../../orders/entities/order.entity");
const service_assignment_entity_1 = require("../../service_assignments/entities/service-assignment.entity");
let Transaction = class Transaction {
    id;
    user_id;
    order_id;
    service_assignment_id;
    amount;
    status;
    gateway;
    created_at;
    user;
    order;
    service_assignment;
};
exports.Transaction = Transaction;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Transaction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'uuid', unique: true }),
    __metadata("design:type", String)
], Transaction.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'order_id', type: 'uuid' }),
    __metadata("design:type", Object)
], Transaction.prototype, "order_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'service_assignment_id', type: 'uuid' }),
    __metadata("design:type", Object)
], Transaction.prototype, "service_assignment_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Transaction.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true, default: 'pendiente' }),
    __metadata("design:type", String)
], Transaction.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", Object)
], Transaction.prototype, "gateway", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Transaction.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Transaction.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_entity_1.Order, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'order_id' }),
    __metadata("design:type", Object)
], Transaction.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => service_assignment_entity_1.ServiceAssignment, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'service_assignment_id' }),
    __metadata("design:type", Object)
], Transaction.prototype, "service_assignment", void 0);
exports.Transaction = Transaction = __decorate([
    (0, typeorm_1.Entity)({ name: 'transactions' })
], Transaction);
//# sourceMappingURL=transaction.entity.js.map