import { IsBoolean, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateServiceOfferDto {
  @IsOptional()
  @IsUUID()
  service_request_id?: string;

  @IsOptional()
  @IsUUID()
  professional_id?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsBoolean()
  is_accepted?: boolean;
}
