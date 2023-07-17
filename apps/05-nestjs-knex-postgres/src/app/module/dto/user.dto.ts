import { PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsString()
  @IsEmail()
  email!: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
