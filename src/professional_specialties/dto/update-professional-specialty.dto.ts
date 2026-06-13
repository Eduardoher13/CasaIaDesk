import { IsBoolean, IsInt, IsOptional, IsUUID } from 'class-validator';

export class UpdateProfessionalSpecialtyDto {
  @IsOptional()
  @IsUUID()
  professional_id?: string;

  @IsOptional()
  @IsInt()
  specialty_id?: number;

  @IsOptional()
  @IsBoolean()
  is_primary?: boolean;
}
