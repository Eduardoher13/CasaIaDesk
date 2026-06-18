import { IsDateString, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class UpdateDeliveryTrackingDto {
  @IsOptional()
  @IsUUID()
  delivery_id?: string;

  @IsOptional()
  @IsNumber()
  lat?: number;

  @IsOptional()
  @IsNumber()
  lng?: number;

  @IsOptional()
  @IsDateString()
  recorded_at?: string;
}
