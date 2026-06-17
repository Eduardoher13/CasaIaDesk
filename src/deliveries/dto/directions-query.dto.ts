import { Type } from 'class-transformer';
import { IsLatitude, IsLongitude } from 'class-validator';

export class DirectionsQueryDto {
  @Type(() => Number)
  @IsLatitude()
  fromLat: number;

  @Type(() => Number)
  @IsLongitude()
  fromLng: number;

  @Type(() => Number)
  @IsLatitude()
  toLat: number;

  @Type(() => Number)
  @IsLongitude()
  toLng: number;
}
