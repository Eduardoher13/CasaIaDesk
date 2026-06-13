import { IsBoolean, IsDateString, IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateServiceRequestDto {
  @IsOptional()
  @IsUUID()
  client_id?: string;

  @IsOptional()
  @IsInt()
  specialty_id?: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsBoolean()
  is_emergency?: boolean;

  @IsOptional()
  @IsDateString()
  preferred_date?: Date;
}
