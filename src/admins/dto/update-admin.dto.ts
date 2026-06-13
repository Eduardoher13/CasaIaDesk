import { IsInt, IsOptional, IsUUID } from 'class-validator';

export class UpdateAdminDto {
  @IsOptional()
  @IsUUID()
  user_id?: string;

  @IsOptional()
  @IsInt()
  permission_level?: number;
}
