import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateClientDto {
  @IsOptional()
  @IsUUID()
  user_id?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsInt()
  points_balance?: number;
}
