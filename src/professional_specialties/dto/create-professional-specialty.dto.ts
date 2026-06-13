import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateProfessionalSpecialtyDto {
  @IsNotEmpty()
  @IsUUID()
  professional_id: string;

  @IsNotEmpty()
  @IsInt()
  specialty_id: number;

  @IsOptional()
  @IsBoolean()
  is_primary?: boolean;
}
