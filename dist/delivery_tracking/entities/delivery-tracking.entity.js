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
exports.DeliveryTracking = void 0;
const typeorm_1 = require("typeorm");
const delivery_entity_1 = require("../../deliveries/entities/delivery.entity");
let DeliveryTracking = class DeliveryTracking {
    id;
    delivery_id;
    lat;
    lng;
    recorded_at;
    delivery;
};
exports.DeliveryTracking = DeliveryTracking;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", String)
], DeliveryTracking.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'delivery_id', type: 'uuid' }),
    __metadata("design:type", String)
], DeliveryTracking.prototype, "delivery_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 7, nullable: true }),
    __metadata("design:type", Number)
], DeliveryTracking.prototype, "lat", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 7, nullable: true }),
    __metadata("design:type", Number)
], DeliveryTracking.prototype, "lng", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'recorded_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], DeliveryTracking.prototype, "recorded_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => delivery_entity_1.Delivery, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'delivery_id' }),
    __metadata("design:type", delivery_entity_1.Delivery)
], DeliveryTracking.prototype, "delivery", void 0);
exports.DeliveryTracking = DeliveryTracking = __decorate([
    (0, typeorm_1.Entity)({ name: 'delivery_tracking' })
], DeliveryTracking);
//# sourceMappingURL=delivery-tracking.entity.js.map