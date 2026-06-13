import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateVehicleDto {
  @IsNotEmpty()
  @IsUUID()
  driver_id: string;

  @IsNotEmpty()
  @IsString()
  plate: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsNumber()
  capacity_kg?: number;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
