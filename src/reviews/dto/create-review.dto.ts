import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsUUID()
  reviewer_id: string;

  @IsOptional()
  @IsUUID()
  service_assignment_id?: string;

  @IsOptional()
  @IsUUID()
  product_id?: string;

  @IsNotEmpty()
  @IsInt()
  rating: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
