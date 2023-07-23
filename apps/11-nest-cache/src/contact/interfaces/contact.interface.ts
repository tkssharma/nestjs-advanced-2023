import { Document } from 'mongoose';

export interface IContact extends Document {
  readonly first_name: string;
  readonly last_name: string;
  readonly email: string;
  readonly phone: string;
  readonly message: string;
}
