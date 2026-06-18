import { IsDateString, IsInt, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateDeliveryDto {
  @IsOptional()
  @IsUUID()
  order_id?: string;

  @IsOptional()
  @IsUUID()
  driver_id?: string;

  @IsOptional()
  @IsUUID()
  vehicle_id?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  pickup_address?: string;

  @IsOptional()
  @IsNumber()
  pickup_lat?: number;

  @IsOptional()
  @IsNumber()
  pickup_lng?: number;

  @IsOptional()
  @IsString()
  delivery_address?: string;

  @IsOptional()
  @IsNumber()
  delivery_lat?: number;

  @IsOptional()
  @IsNumber()
  delivery_lng?: number;

  @IsOptional()
  @IsInt()
  distance_meters?: number;

  @IsOptional()
  @IsInt()
  duration_seconds?: number;

  @IsOptional()
  @IsString()
  polyline_encoded?: string;

  @IsOptional()
  @IsDateString()
  started_at?: string;

  @IsOptional()
  @IsDateString()
  completed_at?: string;
}
