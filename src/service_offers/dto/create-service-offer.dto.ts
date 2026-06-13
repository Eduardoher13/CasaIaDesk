import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateServiceOfferDto {
  @IsNotEmpty()
  @IsUUID()
  service_request_id: string;

  @IsNotEmpty()
  @IsUUID()
  professional_id: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsBoolean()
  is_accepted?: boolean;
}
