import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceAssignment } from './entities/service-assignment.entity';
import { ServiceAssignmentService } from './service_assignments.service';
import { ServiceAssignmentController } from './service_assignments.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceAssignment])],
  controllers: [ServiceAssignmentController],
  providers: [ServiceAssignmentService],
  exports: [ServiceAssignmentService],
})
export class ServiceAssignmentModule {}
