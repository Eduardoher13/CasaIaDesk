import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryTracking } from './entities/delivery-tracking.entity';
import { DeliveryTrackingService } from './delivery_tracking.service';
import { DeliveryTrackingController } from './delivery_tracking.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryTracking])],
  controllers: [DeliveryTrackingController],
  providers: [DeliveryTrackingService],
  exports: [DeliveryTrackingService],
})
export class DeliveryTrackingModule {}
