import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMembership } from './entities/user-membership.entity';
import { UserMembershipService } from './user_memberships.service';
import { UserMembershipController } from './user_memberships.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserMembership])],
  controllers: [UserMembershipController],
  providers: [UserMembershipService],
  exports: [UserMembershipService],
})
export class UserMembershipModule {}
