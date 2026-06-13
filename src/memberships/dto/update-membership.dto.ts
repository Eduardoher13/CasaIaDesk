import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMembershipDto {
  @IsOptional()
  @IsString()
  plan?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsInt()
  duration_days?: number;

  @IsOptional()
  @IsString()
  description?: string;
}
