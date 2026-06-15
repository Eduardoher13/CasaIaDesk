import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Product } from '../products/entities/product.entity';
import { CompanyService } from './companies.service';
import { CompanyController } from './companies.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Company, Product])],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
