import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateProfessionalDto {
  @IsNotEmpty()
  @IsUUID()
  user_id: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsInt()
  years_experience?: number;

  @IsOptional()
  @IsNumber()
  base_price?: number;

  @IsOptional()
  @IsNumber()
  avg_rating?: number;

  @IsOptional()
  @IsInt()
  total_reviews?: number;

  @IsOptional()
  @IsBoolean()
  is_available?: boolean;

  @IsOptional()
  @IsNumber()
  service_radius_km?: number;
}
