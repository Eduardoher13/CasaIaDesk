"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMembershipModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_membership_entity_1 = require("./entities/user-membership.entity");
const user_memberships_service_1 = require("./user_memberships.service");
const user_memberships_controller_1 = require("./user_memberships.controller");
let UserMembershipModule = class UserMembershipModule {
};
exports.UserMembershipModule = UserMembershipModule;
exports.UserMembershipModule = UserMembershipModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_membership_entity_1.UserMembership])],
        controllers: [user_memberships_controller_1.UserMembershipController],
        providers: [user_memberships_service_1.UserMembershipService],
        exports: [user_memberships_service_1.UserMembershipService],
    })
], UserMembershipModule);
//# sourceMappingURL=user_memberships.module.js.map