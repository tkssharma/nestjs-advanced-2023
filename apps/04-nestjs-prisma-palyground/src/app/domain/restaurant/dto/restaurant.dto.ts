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

export class getRestaurantByIdDto {
  @ApiProperty({
    description: 'UUID',
    example: 'UUID',
    required: true,
  })
  @IsUUID()
  public id!: string;
}

export class AddressDto {
  @ApiProperty({
    description: 'city',
    example: 'delhi',
    required: true,
  })
  @IsDefined()
  @IsString()
  public city!: string;

  @ApiProperty({
    description: 'state',
    example: 'delhi',
    required: true,
  })
  @IsDefined()
  @IsString()
  public state!: string;

  @ApiProperty({
    description: 'country',
    example: 'INDIA',
    required: true,
  })
  @IsDefined()
  @IsString()
  public country!: string;

  @ApiProperty({
    description: 'pin_code',
    example: '6789876',
    required: true,
  })
  @IsDefined()
  @IsString()
  public pincode!: string;

  @ApiProperty({
    description: 'street',
    example: 'street',
    required: true,
  })
  @IsDefined()
  @IsString()
  public street!: string;

  @ApiProperty({
    description: 'name',
    example: 'name',
    required: true,
  })
  @IsDefined()
  @IsString()
  public name!: string;
}

export class SearchQueryDto {
  @ApiProperty({
    description: 'latitude',
    example: '11',
    required: false,
  })
  @IsOptional()
  @IsString()
  public latitude!: string;

  @ApiProperty({
    description: 'longitude',
    example: '11',
    required: false,
  })
  @IsOptional()
  @IsString()
  public longitude!: string;

  @ApiProperty({
    description: 'restaurant name or dish menu name',
    example: 'pizza hut',
    required: true,
  })
  @IsOptional()
  @IsString()
  @IsDefined()
  public search_text!: string;

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

export class CreateRestaurantBodyDto {
  @ApiProperty({
    description: 'name of restaurant',
    example: 'uber clone',
    required: true,
  })
  @IsDefined()
  @IsString()
  public name!: string;

  @ApiProperty({
    description: 'desc of restaurant',
    example: 'uber clone',
    required: true,
  })
  @IsOptional()
  public description!: string;

  @ApiProperty({
    description: 'latitude',
    example: '11',
    required: true,
  })
  @IsDefined()
  @IsString()
  public latitude!: string;

  @ApiProperty({
    description: 'longitude',
    example: '11',
    required: true,
  })
  @IsDefined()
  @IsString()
  public longitude!: string;

  @ApiProperty({
    description: 'contact_no',
    example: '8998978987',
    required: true,
  })
  @IsOptional()
  @IsString()
  public contact_no!: string;

  @ApiProperty({
    description: 'thumbnails',
    example: [
      'https://logos-world.net/wp-content/uploads/2021/08/Dominos-Logo.png',
    ],
    required: true,
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  public thumbnails!: string[];

  @ApiProperty({
    description: 'delivery_options',
    example: 'delivery_options',
    required: true,
  })
  @IsOptional()
  @IsString()
  public delivery_options!: string;

  @ApiProperty({
    description: 'delivery_time',
    example: 30,
    required: true,
  })
  @Transform(() => Number())
  @IsOptional()
  @IsNumber()
  public delivery_time!: number;

  @ApiProperty({
    description: 'average_price',
    example: 500,
    required: true,
  })
  @Transform(() => Number())
  @IsOptional()
  @IsNumber()
  public average_price!: number;

  @ApiProperty({
    description: 'pickup_options',
    example: 'pickup_options',
    required: true,
  })
  @IsOptional()
  @IsString()
  public pickup_options!: string;

  @ApiProperty({
    description: 'opens_at',
    example: '2023-10-05T14:48:00.000Z',
    required: true,
  })
  @IsDateString()
  @IsString()
  public opens_at!: string;

  @ApiProperty({
    description: 'closes_at',
    example: '2023-10-05T14:48:00.000Z',
    required: true,
  })
  @IsDateString()
  @IsString()
  public closes_at!: string;

  @ApiProperty({
    description: 'website_url',
    example: 'https://dominos.com',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  @IsString()
  public website_url!: string;

  @ApiProperty({
    description: 'address payload',
    example: {
      name: 'Uber Eats',
      city: 'jaipur',
      state: 'Raj',
      street: 'Raj',
      pincode: '345254',
      country: 'India',
    },
    required: true,
  })
  @IsObject()
  @IsDefined()
  @ValidateNested()
  @ValidateType(() => AddressDto)
  public address!: AddressDto;
}
