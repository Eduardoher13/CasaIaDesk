import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateCompanyDto {
  @IsOptional()
  @IsUUID()
  user_id?: string;

  @IsOptional()
  @IsString()
  commercial_name?: string;

  @IsOptional()
  @IsString()
  ruc?: string;

  @IsOptional()
  @IsString()
  logo_url?: string;
}
