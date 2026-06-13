import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsUUID()
  user_id: string;

  @IsOptional()
  @IsUUID()
  order_id?: string;

  @IsOptional()
  @IsUUID()
  service_assignment_id?: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  gateway?: string;
}
