import { IsInt, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  @IsUUID()
  user_id: string;

  @IsOptional()
  @IsInt()
  permission_level?: number;
}
