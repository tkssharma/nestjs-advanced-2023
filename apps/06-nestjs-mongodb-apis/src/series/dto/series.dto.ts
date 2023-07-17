import { IsString, IsNotEmpty } from 'class-validator';

export class SeriesDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export default SeriesDto;
