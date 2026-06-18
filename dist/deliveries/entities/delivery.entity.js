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
exports.Delivery = void 0;
const typeorm_1 = require("typeorm");
const order_entity_1 = require("../../orders/entities/order.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const vehicle_entity_1 = require("../../vehicles/entities/vehicle.entity");
let Delivery = class Delivery {
    id;
    order_id;
    driver_id;
    vehicle_id;
    status;
    pickup_address;
    pickup_lat;
    pickup_lng;
    delivery_address;
    delivery_lat;
    delivery_lng;
    distance_meters;
    duration_seconds;
    polyline_encoded;
    started_at;
    completed_at;
    created_at;
    updated_at;
    order;
    driver;
    vehicle;
};
exports.Delivery = Delivery;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Delivery.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'order_id', type: 'uuid' }),
    __metadata("design:type", String)
], Delivery.prototype, "order_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'driver_id', type: 'uuid' }),
    __metadata("design:type", String)
], Delivery.prototype, "driver_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vehicle_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], Delivery.prototype, "vehicle_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true, default: 'pendiente' }),
    __metadata("design:type", String)
], Delivery.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pickup_address', type: 'text' }),
    __metadata("design:type", String)
], Delivery.prototype, "pickup_address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pickup_lat', type: 'decimal', precision: 10, scale: 7, nullable: true }),
    __metadata("design:type", Object)
], Delivery.prototype, "pickup_lat", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pickup_lng', type: 'decimal', precision: 10, scale: 7, nullable: true }),
    __metadata("design:type", Object)
], Delivery.prototype, "pickup_lng", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'delivery_address', type: 'text' }),
    __metadata("design:type", String)
], Delivery.prototype, "delivery_address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'delivery_lat', type: 'decimal', precision: 10, scale: 7, nullable: true }),
    __metadata("design:type", Object)
], Delivery.prototype, "delivery_lat", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'delivery_lng', type: 'decimal', precision: 10, scale: 7, nullable: true }),
    __metadata("design:type", Object)
], Delivery.prototype, "delivery_lng", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'distance_meters', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Delivery.prototype, "distance_meters", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'duration_seconds', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Delivery.prototype, "duration_seconds", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'polyline_encoded', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Delivery.prototype, "polyline_encoded", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'started_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], Delivery.prototype, "started_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'completed_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], Delivery.prototype, "completed_at", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Delivery.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Delivery.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_entity_1.Order, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'order_id' }),
    __metadata("design:type", order_entity_1.Order)
], Delivery.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'driver_id' }),
    __metadata("design:type", user_entity_1.User)
], Delivery.prototype, "driver", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vehicle_entity_1.Vehicle, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'vehicle_id' }),
    __metadata("design:type", Object)
], Delivery.prototype, "vehicle", void 0);
exports.Delivery = Delivery = __decorate([
    (0, typeorm_1.Entity)({ name: 'deliveries' })
], Delivery);
//# sourceMappingURL=delivery.entity.js.map