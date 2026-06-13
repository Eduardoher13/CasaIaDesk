import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMembershipDto {
  @IsNotEmpty()
  @IsString()
  plan: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsInt()
  duration_days?: number;

  @IsOptional()
  @IsString()
  description?: string;
}
