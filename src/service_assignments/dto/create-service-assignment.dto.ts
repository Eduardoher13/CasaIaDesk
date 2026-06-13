import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateServiceAssignmentDto {
  @IsNotEmpty()
  @IsUUID()
  service_request_id: string;

  @IsNotEmpty()
  @IsUUID()
  service_offer_id: string;

  @IsNotEmpty()
  @IsUUID()
  professional_id: string;

  @IsNotEmpty()
  @IsUUID()
  client_id: string;

  @IsNotEmpty()
  @IsNumber()
  final_price: number;

  @IsOptional()
  @IsDateString()
  started_at?: Date;

  @IsOptional()
  @IsDateString()
  completed_at?: Date;
}
