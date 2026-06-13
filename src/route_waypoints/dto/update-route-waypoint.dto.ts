import { IsBoolean, IsDateString, IsInt, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateRouteWaypointDto {
  @IsOptional()
  @IsUUID()
  delivery_id?: string;

  @IsOptional()
  @IsInt()
  stop_order?: number;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsNumber()
  lat?: number;

  @IsOptional()
  @IsNumber()
  lng?: number;

  @IsOptional()
  @IsBoolean()
  is_pickup?: boolean;

  @IsOptional()
  @IsDateString()
  arrived_at?: Date;

  @IsOptional()
  @IsDateString()
  left_at?: Date;
}
