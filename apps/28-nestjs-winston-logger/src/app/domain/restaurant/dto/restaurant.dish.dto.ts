import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform, Type as ValidateType } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsDefined,
  IsEmail,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type as validateType } from 'class-transformer';
import { getRestaurantByIdDto } from './restaurant.dto';

export class RestaurantParamParamDto {
  @ApiProperty({
    description: '[restaurant id ] as uuid',
    example: '',
    required: true,
  })
  @IsUUID()
  public id!: string;
}

export enum mealType {
  'breakfast' = 'breakfast',
  'lunch' = 'lunch',
  'dinner' = 'dinner',
}

export enum cuisineType {
  'indian' = 'indian',
  'north_indian' = 'north_indian',
  'italian' = 'italian',
  'chinese' = 'chinese',
}

export enum foodType {
  'veg' = 'veg',
  'non_veg' = 'non_veg',
  'vegan' = 'vegan',
}

export enum filterType {
  'price' = 'price',
  'rating' = 'rating',
  'delivery_time' = 'delivery_time',
}

export enum OrderBy {
  'ASC' = 'ASC',
  'DESC' = 'DESC',
}

export class UpdateDishItemParamDto extends RestaurantParamParamDto {
  @ApiProperty({
    description: '[dish_id ] as uuid',
    example: '',
    required: true,
  })
  @IsUUID()
  public dish_id!: string;
}

export class getRestaurantDishByIdDto extends getRestaurantByIdDto {
  @ApiProperty({
    description: 'UUID',
    example: 'UUID',
    required: true,
  })
  @IsUUID()
  public dish_id!: string;
}

export class CreateRestaurantDishBodyDto {
  @ApiProperty({
    description: 'name',
    example: 'paneer tikka',
    required: true,
  })
  @IsDefined()
  @IsString()
  public name!: string;

  @ApiProperty({
    description: 'cuisine_type',
    required: true,
    enum: cuisineType,
    example: cuisineType.indian,
  })
  @IsEnum(cuisineType)
  public cuisine_type!: string;

  @ApiProperty({
    description: 'meal_type',
    required: true,
    enum: mealType,
    example: mealType.lunch,
  })
  @IsEnum(mealType)
  public meal_type!: string;

  @ApiProperty({
    description: 'description',
    example:
      'Paneer tikka is a North Indian appetizer where chunks of paneer are marinated in spiced yogurt and grilled in a Tandoor, a traditional clay oven',
    required: true,
  })
  @IsOptional()
  @IsString()
  public description!: string;

  @ApiProperty({
    description: 'category',
    example: 'category',
    required: true,
  })
  @IsOptional()
  @IsString()
  public category!: string;

  @ApiProperty({
    description: 'food_type',
    required: true,
    enum: foodType,
    example: foodType.veg,
  })
  @IsEnum(foodType)
  public food_type!: string;

  @ApiProperty({
    description: 'ingredients',
    example: 'ingredients',
    required: true,
  })
  @IsOptional()
  @IsString()
  public ingredients!: string;

  @ApiProperty({
    description: 'price',
    example: 200,
    required: true,
  })
  @IsNumber()
  public price!: number;

  @ApiProperty({
    description: '60 minute',
    example: 60,
    required: true,
  })
  @IsNumber()
  public delivery_time!: number;

  @ApiProperty({
    description: 'thumbnails',
    example:
      'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/ryyohiioctfdjumb0new',

    required: true,
  })
  @IsOptional()
  public thumbnails!: string;
}

export class SearchDishQueryDto {
  @ApiProperty({
    description: 'search_text',
    example: 'paneer tikka',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsDefined()
  public search_text!: string;

  @ApiProperty({
    description: 'filterType',
    required: false,
    enum: filterType,
    example: filterType.price,
  })
  @IsOptional()
  @IsEnum(filterType)
  public filter_type!: string;

  @ApiProperty({
    description: 'OrderBy',
    required: false,
    enum: OrderBy,
    example: OrderBy.ASC,
  })
  @IsOptional()
  @IsEnum(OrderBy)
  public order_by!: string;

  @ApiProperty({
    description: 'page count',
    example: '1',
    required: false,
  })
  @Transform(() => Number())
  @IsOptional()
  @IsNumber()
  public page!: number;

  @ApiProperty({
    description: 'limit per page',
    example: '10',
    required: false,
  })
  @Transform(() => Number())
  @IsOptional()
  @IsNumber()
  public limit!: number;
}

export class UpdateRestaurantDishBodyDto extends PartialType(
  CreateRestaurantDishBodyDto,
) {}
