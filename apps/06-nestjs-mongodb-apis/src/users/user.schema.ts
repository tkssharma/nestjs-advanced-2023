import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Exclude, Transform, Type } from 'class-transformer';
import { Address, AddressSchema } from './address.schema';
import { Post } from '../posts/post.schema';

export type UserDocument = User & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class User {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ unique: true })
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  fullName: string;

  @Prop()
  @Exclude()
  password: string;

  @Prop({ type: AddressSchema })
  @Type(() => Address)
  address: Address;

  @Prop({
    get: (creditCardNumber: string) => {
      if (!creditCardNumber) {
        return;
      }
      const lastFourDigits = creditCardNumber.slice(
        creditCardNumber.length - 4,
      );
      return `****-****-****-${lastFourDigits}`;
    },
  })
  creditCardNumber?: string;

  @Type(() => Post)
  posts: Post[];
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ firstName: 'text', lastName: 'text' });

UserSchema.virtual('fullName').get(function (this: User) {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'author',
});

export { UserSchema };
