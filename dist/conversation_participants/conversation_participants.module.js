"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationParticipantModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const conversation_participant_entity_1 = require("./entities/conversation-participant.entity");
const conversation_participants_service_1 = require("./conversation_participants.service");
const conversation_participants_controller_1 = require("./conversation_participants.controller");
let ConversationParticipantModule = class ConversationParticipantModule {
};
exports.ConversationParticipantModule = ConversationParticipantModule;
exports.ConversationParticipantModule = ConversationParticipantModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([conversation_participant_entity_1.ConversationParticipant])],
        controllers: [conversation_participants_controller_1.ConversationParticipantController],
        providers: [conversation_participants_service_1.ConversationParticipantService],
        exports: [conversation_participants_service_1.ConversationParticipantService],
    })
], ConversationParticipantModule);
//# sourceMappingURL=conversation_participants.module.js.map