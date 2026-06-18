import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateDeliveryTrackingDto {
  @IsNotEmpty()
  @IsUUID()
  delivery_id: string;

  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @IsNotEmpty()
  @IsNumber()
  lng: number;

  @IsOptional()
  @IsDateString()
  recorded_at?: string;
}
