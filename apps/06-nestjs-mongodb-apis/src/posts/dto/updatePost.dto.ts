import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { User } from '../../users/user.schema';
import { Exclude, Type } from 'class-transformer';
import { Category } from '../../categories/category.schema';
import { Series } from '../../series/series.schema';

export class UpdatePostDto {
  @IsOptional()
  @Exclude()
  _id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @Type(() => Category)
  categories: Category[];

  @Type(() => User)
  @IsNotEmpty()
  author: User;

  @Type(() => Series)
  @IsOptional()
  series?: Series;
}

export default UpdatePostDto;
