import { IsNotEmpty, IsString } from 'class-validator';

export class SetProductImageDto {
  @IsNotEmpty()
  @IsString()
  image_url: string;
}
