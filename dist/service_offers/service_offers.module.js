"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceOfferModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const service_offer_entity_1 = require("./entities/service-offer.entity");
const service_offers_service_1 = require("./service_offers.service");
const service_offers_controller_1 = require("./service_offers.controller");
let ServiceOfferModule = class ServiceOfferModule {
};
exports.ServiceOfferModule = ServiceOfferModule;
exports.ServiceOfferModule = ServiceOfferModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([service_offer_entity_1.ServiceOffer])],
        controllers: [service_offers_controller_1.ServiceOfferController],
        providers: [service_offers_service_1.ServiceOfferService],
        exports: [service_offers_service_1.ServiceOfferService],
    })
], ServiceOfferModule);
//# sourceMappingURL=service_offers.module.js.map