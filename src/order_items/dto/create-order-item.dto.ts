import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsUUID()
  order_id: string;

  @IsNotEmpty()
  @IsUUID()
  product_id: string;

  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  unit_price: number;

  @IsNotEmpty()
  @IsNumber()
  subtotal: number;
}
