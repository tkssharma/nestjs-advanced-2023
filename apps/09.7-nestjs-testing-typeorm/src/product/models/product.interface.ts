import { User } from 'src/auth/models/user.class';

export interface Product {
  id?: number;
  body?: string;
  createdAt: Date;
  creator?: User;
}
