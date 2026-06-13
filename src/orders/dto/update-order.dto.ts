import { IsDateString, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsUUID()
  client_id?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsNumber()
  total?: number;

  @IsOptional()
  @IsDateString()
  paid_at?: Date;
}
