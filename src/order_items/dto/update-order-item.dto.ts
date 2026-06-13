import { IsInt, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class UpdateOrderItemDto {
  @IsOptional()
  @IsUUID()
  order_id?: string;

  @IsOptional()
  @IsUUID()
  product_id?: string;

  @IsOptional()
  @IsInt()
  quantity?: number;

  @IsOptional()
  @IsNumber()
  unit_price?: number;

  @IsOptional()
  @IsNumber()
  subtotal?: number;
}
