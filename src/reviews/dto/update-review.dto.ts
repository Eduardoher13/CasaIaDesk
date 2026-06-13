import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateReviewDto {
  @IsOptional()
  @IsUUID()
  reviewer_id?: string;

  @IsOptional()
  @IsUUID()
  service_assignment_id?: string;

  @IsOptional()
  @IsUUID()
  product_id?: string;

  @IsOptional()
  @IsInt()
  rating?: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
