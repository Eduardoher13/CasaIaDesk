import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateUserMembershipDto {
  @IsNotEmpty()
  @IsUUID()
  user_id: string;

  @IsNotEmpty()
  @IsInt()
  membership_id: number;

  @IsNotEmpty()
  @IsDateString()
  expires_at: Date;

  @IsOptional()
  @IsBoolean()
  auto_renew?: boolean;
}
