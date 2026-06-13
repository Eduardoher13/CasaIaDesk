import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsUUID()
  company_id?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsInt()
  stock?: number;

  @IsOptional()
  @IsNumber()
  avg_rating?: number;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
