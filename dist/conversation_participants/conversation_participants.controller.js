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
exports.ConversationParticipantController = void 0;
const common_1 = require("@nestjs/common");
const pagination_query_dto_1 = require("../common/dto/pagination-query.dto");
const conversation_participants_service_1 = require("./conversation_participants.service");
const create_conversation_participant_dto_1 = require("./dto/create-conversation-participant.dto");
const update_conversation_participant_dto_1 = require("./dto/update-conversation-participant.dto");
let ConversationParticipantController = class ConversationParticipantController {
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
    findOne(conversation_id, user_id) {
        return this.service.findOne(conversation_id, user_id);
    }
    update(conversation_id, user_id, updateDto) {
        return this.service.update(conversation_id, user_id, updateDto);
    }
    remove(conversation_id, user_id) {
        return this.service.remove(conversation_id, user_id);
    }
};
exports.ConversationParticipantController = ConversationParticipantController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_conversation_participant_dto_1.CreateConversationParticipantDto]),
    __metadata("design:returntype", void 0)
], ConversationParticipantController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_query_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", void 0)
], ConversationParticipantController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':conversation_id/:user_id'),
    __param(0, (0, common_1.Param)('conversation_id')),
    __param(1, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ConversationParticipantController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':conversation_id/:user_id'),
    __param(0, (0, common_1.Param)('conversation_id')),
    __param(1, (0, common_1.Param)('user_id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_conversation_participant_dto_1.UpdateConversationParticipantDto]),
    __metadata("design:returntype", void 0)
], ConversationParticipantController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':conversation_id/:user_id'),
    __param(0, (0, common_1.Param)('conversation_id')),
    __param(1, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ConversationParticipantController.prototype, "remove", null);
exports.ConversationParticipantController = ConversationParticipantController = __decorate([
    (0, common_1.Controller)('conversation-participants'),
    __metadata("design:paramtypes", [conversation_participants_service_1.ConversationParticipantService])
], ConversationParticipantController);
//# sourceMappingURL=conversation_participants.controller.js.map