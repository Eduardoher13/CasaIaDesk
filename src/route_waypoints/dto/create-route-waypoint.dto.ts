import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateRouteWaypointDto {
  @IsNotEmpty()
  @IsUUID()
  delivery_id: string;

  @IsNotEmpty()
  @IsInt()
  stop_order: number;

  @IsNotEmpty()
  @IsString()
  address: string;

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
