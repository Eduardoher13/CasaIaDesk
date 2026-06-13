"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessionalSpecialtyModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const professional_specialty_entity_1 = require("./entities/professional-specialty.entity");
const professional_specialties_service_1 = require("./professional_specialties.service");
const professional_specialties_controller_1 = require("./professional_specialties.controller");
let ProfessionalSpecialtyModule = class ProfessionalSpecialtyModule {
};
exports.ProfessionalSpecialtyModule = ProfessionalSpecialtyModule;
exports.ProfessionalSpecialtyModule = ProfessionalSpecialtyModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([professional_specialty_entity_1.ProfessionalSpecialty])],
        controllers: [professional_specialties_controller_1.ProfessionalSpecialtyController],
        providers: [professional_specialties_service_1.ProfessionalSpecialtyService],
        exports: [professional_specialties_service_1.ProfessionalSpecialtyService],
    })
], ProfessionalSpecialtyModule);
//# sourceMappingURL=professional_specialties.module.js.map