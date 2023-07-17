import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
