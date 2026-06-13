import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specialty } from './entities/specialty.entity';
import { SpecialtyService } from './specialties.service';
import { SpecialtyController } from './specialties.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Specialty])],
  controllers: [SpecialtyController],
  providers: [SpecialtyService],
  exports: [SpecialtyService],
})
export class SpecialtyModule {}
