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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessionalSpecialtyController = void 0;
const common_1 = require("@nestjs/common");
const pagination_query_dto_1 = require("../common/dto/pagination-query.dto");
const professional_specialties_service_1 = require("./professional_specialties.service");
const create_professional_specialty_dto_1 = require("./dto/create-professional-specialty.dto");
const update_professional_specialty_dto_1 = require("./dto/update-professional-specialty.dto");
let ProfessionalSpecialtyController = class ProfessionalSpecialtyController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(createDto) {
        return this.service.create(createDto);
    }
    findAll(filters) {
        return this.service.findAll(filters);
    }
    findByProfessional(professionalId) {
        return this.service.findByProfessional(professionalId);
    }
    findOne(professional_id, specialty_id) {
        return this.service.findOne(professional_id, specialty_id);
    }
    update(professional_id, specialty_id, updateDto) {
        return this.service.update(professional_id, specialty_id, updateDto);
    }
    remove(professional_id, specialty_id) {
        return this.service.remove(professional_id, specialty_id);
    }
};
exports.ProfessionalSpecialtyController = ProfessionalSpecialtyController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_professional_specialty_dto_1.CreateProfessionalSpecialtyDto]),
    __metadata("design:returntype", void 0)
], ProfessionalSpecialtyController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_query_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", void 0)
], ProfessionalSpecialtyController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('by-professional/:professionalId'),
    __param(0, (0, common_1.Param)('professionalId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProfessionalSpecialtyController.prototype, "findByProfessional", null);
__decorate([
    (0, common_1.Get)(':professional_id/:specialty_id'),
    __param(0, (0, common_1.Param)('professional_id')),
    __param(1, (0, common_1.Param)('specialty_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], ProfessionalSpecialtyController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':professional_id/:specialty_id'),
    __param(0, (0, common_1.Param)('professional_id')),
    __param(1, (0, common_1.Param)('specialty_id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, update_professional_specialty_dto_1.UpdateProfessionalSpecialtyDto]),
    __metadata("design:returntype", void 0)
], ProfessionalSpecialtyController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':professional_id/:specialty_id'),
    __param(0, (0, common_1.Param)('professional_id')),
    __param(1, (0, common_1.Param)('specialty_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], ProfessionalSpecialtyController.prototype, "remove", null);
exports.ProfessionalSpecialtyController = ProfessionalSpecialtyController = __decorate([
    (0, common_1.Controller)('professional-specialties'),
    __metadata("design:paramtypes", [professional_specialties_service_1.ProfessionalSpecialtyService])
], ProfessionalSpecialtyController);
//# sourceMappingURL=professional_specialties.controller.js.map