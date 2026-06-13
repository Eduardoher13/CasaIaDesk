import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professional } from './entities/professional.entity';
import { ProfessionalService } from './professionals.service';
import { ProfessionalController } from './professionals.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Professional])],
  controllers: [ProfessionalController],
  providers: [ProfessionalService],
  exports: [ProfessionalService],
})
export class ProfessionalModule {}
