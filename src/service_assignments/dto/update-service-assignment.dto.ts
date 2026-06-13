import { IsDateString, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class UpdateServiceAssignmentDto {
  @IsOptional()
  @IsUUID()
  service_request_id?: string;

  @IsOptional()
  @IsUUID()
  service_offer_id?: string;

  @IsOptional()
  @IsUUID()
  professional_id?: string;

  @IsOptional()
  @IsUUID()
  client_id?: string;

  @IsOptional()
  @IsNumber()
  final_price?: number;

  @IsOptional()
  @IsDateString()
  started_at?: Date;

  @IsOptional()
  @IsDateString()
  completed_at?: Date;
}
