import { IsEmail, IsString } from 'class-validator';
import { Product } from '../../product/models/product.interface';
import { Role } from './role.enum';

export class User {
  id?: number;
  givenName?: string;
  familyName?: string;
  @IsEmail()
  email?: string;
  @IsString()
  password?: string;
  imagePath?: string;
  role?: Role;
  products?: Product[];
}
