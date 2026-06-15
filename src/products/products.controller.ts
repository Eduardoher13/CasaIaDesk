import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { FindProductsDto } from './dto/find-products.dto';
import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SetProductImageDto } from './dto/set-product-image.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Post()
  create(@Body() createDto: CreateProductDto) {
    return this.service.create(createDto);
  }

  @Get()
  findAll(@Query() filters: PaginationQueryDto) {
    return this.service.findAll(filters);
  }

  @Get('active')
  findActive(@Query() filters: FindProductsDto) {
    return this.service.findActive(filters);
  }

  @Get('by-company/:companyId')
  findByCompany(
    @Param('companyId') companyId: string,
    @Query() filters: PaginationQueryDto,
  ) {
    return this.service.findByCompany(companyId, filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id/image')
  setImageUrl(@Param('id') id: string, @Body() dto: SetProductImageDto) {
    return this.service.setImageUrl(id, dto.image_url);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateProductDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
