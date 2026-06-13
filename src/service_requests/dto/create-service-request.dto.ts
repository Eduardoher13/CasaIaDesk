import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateServiceRequestDto {
  @IsNotEmpty()
  @IsUUID()
  client_id: string;

  @IsNotEmpty()
  @IsInt()
  specialty_id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  address: string;

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
