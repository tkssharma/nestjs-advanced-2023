import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsEmail,
  IsDefined,
  IsObject,
  IsOptional,
  ValidateNested,
  IsArray,
  ArrayMinSize,
} from 'class-validator';
import { Transform, Type as ValidateType } from 'class-transformer';

export class UserQueryDto {
  @ApiProperty({
    description: 'email',
    example: 'test@gmail.com',
    required: true,
  })
  @IsDefined()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'pass ids comma separated',
    example: '1,2,3,4,5,6',
    required: true,
  })
  @IsOptional()
  @Transform(({ value }: any) =>
    typeof value === 'string' ? value.split(',') : value,
  )
  @IsString({ each: true })
  ids: String[];
}
export class AddressInfoDto {
  @ApiProperty({
    description: 'city',
    example: 'Delhi',
    required: true,
  })
  @IsString()
  city: string;

  @ApiProperty({
    description: 'state',
    example: 'Delhi',
    required: true,
  })
  @IsString()
  state: string;
}
export class CreateUserDto {
  @ApiProperty({
    description: 'email',
    example: 'test@gmail.com',
    required: true,
  })
  @IsDefined()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'username',
    example: 'Dev',
    required: true,
  })
  @IsDefined()
  @IsString()
  username: string;

  @ApiProperty({
    description: 'address',
    example: [
      {
        city: 'Udaipur',
        state: 'Raj',
      },
    ],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested()
  @ValidateType(() => AddressInfoDto)
  public address: AddressInfoDto[];
}

export class CrateUserResponseDto {
  @ApiResponseProperty({
    example: 'da9b9f51-23b8-4642-97f7-52537b3cf53b',
    format: 'v4',
  })
  public id: string;

  @ApiResponseProperty({
    example: 'user@gmail.com',
  })
  public email: string;

  @ApiResponseProperty({
    example: 'user@gmail.com',
  })
  public username: string;
}
