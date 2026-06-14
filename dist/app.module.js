"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_config_1 = require("./database/typeorm.config");
const users_module_1 = require("./users/users.module");
const clients_module_1 = require("./clients/clients.module");
const professionals_module_1 = require("./professionals/professionals.module");
const companies_module_1 = require("./companies/companies.module");
const admins_module_1 = require("./admins/admins.module");
const specialties_module_1 = require("./specialties/specialties.module");
const professional_specialties_module_1 = require("./professional_specialties/professional_specialties.module");
const products_module_1 = require("./products/products.module");
const orders_module_1 = require("./orders/orders.module");
const order_items_module_1 = require("./order_items/order_items.module");
const service_requests_module_1 = require("./service_requests/service_requests.module");
const service_offers_module_1 = require("./service_offers/service_offers.module");
const service_assignments_module_1 = require("./service_assignments/service_assignments.module");
const reviews_module_1 = require("./reviews/reviews.module");
const memberships_module_1 = require("./memberships/memberships.module");
const user_memberships_module_1 = require("./user_memberships/user_memberships.module");
const community_posts_module_1 = require("./community_posts/community_posts.module");
const post_comments_module_1 = require("./post_comments/post_comments.module");
const conversations_module_1 = require("./conversations/conversations.module");
const conversation_participants_module_1 = require("./conversation_participants/conversation_participants.module");
const messages_module_1 = require("./messages/messages.module");
const transactions_module_1 = require("./transactions/transactions.module");
const vehicles_module_1 = require("./vehicles/vehicles.module");
const deliveries_module_1 = require("./deliveries/deliveries.module");
const route_waypoints_module_1 = require("./route_waypoints/route_waypoints.module");
const delivery_tracking_module_1 = require("./delivery_tracking/delivery_tracking.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => (0, typeorm_config_1.buildTypeOrmConfig)(configService),
            }),
            users_module_1.UserModule,
            clients_module_1.ClientModule,
            professionals_module_1.ProfessionalModule,
            companies_module_1.CompanyModule,
            admins_module_1.AdminModule,
            specialties_module_1.SpecialtyModule,
            professional_specialties_module_1.ProfessionalSpecialtyModule,
            products_module_1.ProductModule,
            orders_module_1.OrderModule,
            order_items_module_1.OrderItemModule,
            service_requests_module_1.ServiceRequestModule,
            service_offers_module_1.ServiceOfferModule,
            service_assignments_module_1.ServiceAssignmentModule,
            reviews_module_1.ReviewModule,
            memberships_module_1.MembershipModule,
            user_memberships_module_1.UserMembershipModule,
            community_posts_module_1.CommunityPostModule,
            post_comments_module_1.PostCommentModule,
            conversations_module_1.ConversationModule,
            conversation_participants_module_1.ConversationParticipantModule,
            messages_module_1.MessageModule,
            transactions_module_1.TransactionModule,
            vehicles_module_1.VehicleModule,
            deliveries_module_1.DeliveryModule,
            route_waypoints_module_1.RouteWaypointModule,
            delivery_tracking_module_1.DeliveryTrackingModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map