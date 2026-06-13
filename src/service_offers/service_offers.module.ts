import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceOffer } from './entities/service-offer.entity';
import { ServiceOfferService } from './service_offers.service';
import { ServiceOfferController } from './service_offers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceOffer])],
  controllers: [ServiceOfferController],
  providers: [ServiceOfferService],
  exports: [ServiceOfferService],
})
export class ServiceOfferModule {}
