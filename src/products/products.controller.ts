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
  findAll(@Query('skip') skip = '0', @Query('take') take = '10') {
    return this.service.findAll(parseInt(skip), parseInt(take));
  }

  @Get('active')
  findActive(
    @Query('skip') skip = '0',
    @Query('take') take = '20',
    @Query('search') search?: string,
  ) {
    return this.service.findActive(parseInt(skip), parseInt(take), search);
  }

  @Get('by-company/:companyId')
  findByCompany(
    @Param('companyId') companyId: string,
    @Query('skip') skip = '0',
    @Query('take') take = '50',
  ) {
    return this.service.findByCompany(
      companyId,
      parseInt(skip),
      parseInt(take),
    );
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
