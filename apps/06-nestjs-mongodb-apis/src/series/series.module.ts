import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import SeriesController from './series.controller';
import SeriesService from './series.service';
import { Series, SeriesSchema } from './series.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Series.name, schema: SeriesSchema }]),
  ],
  controllers: [SeriesController],
  providers: [SeriesService],
})
class SeriesModule {}

export default SeriesModule;
