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
exports.ProfessionalSpecialty = void 0;
const typeorm_1 = require("typeorm");
const professional_entity_1 = require("../../professionals/entities/professional.entity");
const specialty_entity_1 = require("../../specialties/entities/specialty.entity");
let ProfessionalSpecialty = class ProfessionalSpecialty {
    professional_id;
    specialty_id;
    is_primary;
    professional;
    specialty;
};
exports.ProfessionalSpecialty = ProfessionalSpecialty;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'professional_id', type: 'uuid' }),
    __metadata("design:type", String)
], ProfessionalSpecialty.prototype, "professional_id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'specialty_id', type: 'int' }),
    __metadata("design:type", Number)
], ProfessionalSpecialty.prototype, "specialty_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_primary', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ProfessionalSpecialty.prototype, "is_primary", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => professional_entity_1.Professional, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'professional_id' }),
    __metadata("design:type", professional_entity_1.Professional)
], ProfessionalSpecialty.prototype, "professional", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => specialty_entity_1.Specialty, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'specialty_id' }),
    __metadata("design:type", specialty_entity_1.Specialty)
], ProfessionalSpecialty.prototype, "specialty", void 0);
exports.ProfessionalSpecialty = ProfessionalSpecialty = __decorate([
    (0, typeorm_1.Entity)({ name: 'professional_specialties' })
], ProfessionalSpecialty);
//# sourceMappingURL=professional-specialty.entity.js.map