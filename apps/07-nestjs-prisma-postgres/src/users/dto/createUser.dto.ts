import { AddressDto } from './address.dto';

export class CreateUserDto {
  email: string;
  name: string;
  password: string;
  address?: AddressDto;
}
