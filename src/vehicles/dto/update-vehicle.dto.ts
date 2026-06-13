import { IsBoolean, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateVehicleDto {
  @IsOptional()
  @IsUUID()
  driver_id?: string;

  @IsOptional()
  @IsString()
  plate?: string;

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
