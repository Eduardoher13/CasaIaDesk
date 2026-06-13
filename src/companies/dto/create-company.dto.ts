import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsUUID()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  commercial_name: string;

  @IsOptional()
  @IsString()
  ruc?: string;

  @IsOptional()
  @IsString()
  logo_url?: string;
}
