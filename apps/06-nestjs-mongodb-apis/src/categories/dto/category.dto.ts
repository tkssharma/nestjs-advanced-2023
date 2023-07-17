import { IsString, IsNotEmpty } from 'class-validator';

export class CategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export default CategoryDto;
