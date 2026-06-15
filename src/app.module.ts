import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { buildTypeOrmConfig } from './database/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/users.module';
import { ClientModule } from './clients/clients.module';
import { ProfessionalModule } from './professionals/professionals.module';
import { CompanyModule } from './companies/companies.module';
import { AdminModule } from './admins/admins.module';
import { SpecialtyModule } from './specialties/specialties.module';
import { ProfessionalSpecialtyModule } from './professional_specialties/professional_specialties.module';
import { ProductModule } from './products/products.module';
import { OrderModule } from './orders/orders.module';
import { OrderItemModule } from './order_items/order_items.module';
import { ServiceRequestModule } from './service_requests/service_requests.module';
import { ServiceOfferModule } from './service_offers/service_offers.module';
import { ServiceAssignmentModule } from './service_assignments/service_assignments.module';
import { ReviewModule } from './reviews/reviews.module';
import { MembershipModule } from './memberships/memberships.module';
import { UserMembershipModule } from './user_memberships/user_memberships.module';
import { CommunityPostModule } from './community_posts/community_posts.module';
import { PostCommentModule } from './post_comments/post_comments.module';
import { ConversationModule } from './conversations/conversations.module';
import { ConversationParticipantModule } from './conversation_participants/conversation_participants.module';
import { MessageModule } from './messages/messages.module';
import { TransactionModule } from './transactions/transactions.module';
import { VehicleModule } from './vehicles/vehicles.module';
import { DeliveryModule } from './deliveries/deliveries.module';
import { RouteWaypointModule } from './route_waypoints/route_waypoints.module';
import { DeliveryTrackingModule } from './delivery_tracking/delivery_tracking.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        buildTypeOrmConfig(configService),
    }),
    AuthModule,
    UserModule,
    ClientModule,
    ProfessionalModule,
    CompanyModule,
    AdminModule,
    SpecialtyModule,
    ProfessionalSpecialtyModule,
    ProductModule,
    OrderModule,
    OrderItemModule,
    ServiceRequestModule,
    ServiceOfferModule,
    ServiceAssignmentModule,
    ReviewModule,
    MembershipModule,
    UserMembershipModule,
    CommunityPostModule,
    PostCommentModule,
    ConversationModule,
    ConversationParticipantModule,
    MessageModule,
    TransactionModule,
    VehicleModule,
    DeliveryModule,
    RouteWaypointModule,
    DeliveryTrackingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
