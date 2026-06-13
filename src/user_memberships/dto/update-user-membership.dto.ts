import { IsBoolean, IsDateString, IsInt, IsOptional, IsUUID } from 'class-validator';

export class UpdateUserMembershipDto {
  @IsOptional()
  @IsUUID()
  user_id?: string;

  @IsOptional()
  @IsInt()
  membership_id?: number;

  @IsOptional()
  @IsDateString()
  expires_at?: Date;

  @IsOptional()
  @IsBoolean()
  auto_renew?: boolean;
}
