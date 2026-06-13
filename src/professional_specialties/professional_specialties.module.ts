import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessionalSpecialty } from './entities/professional-specialty.entity';
import { ProfessionalSpecialtyService } from './professional_specialties.service';
import { ProfessionalSpecialtyController } from './professional_specialties.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProfessionalSpecialty])],
  controllers: [ProfessionalSpecialtyController],
  providers: [ProfessionalSpecialtyService],
  exports: [ProfessionalSpecialtyService],
})
export class ProfessionalSpecialtyModule {}
