import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';

export type SeriesDocument = Series & Document;

@Schema()
export class Series {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  name: string;
}

export const SeriesSchema = SchemaFactory.createForClass(Series);
