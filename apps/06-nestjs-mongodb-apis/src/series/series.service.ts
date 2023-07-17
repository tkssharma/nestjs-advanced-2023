import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Series, SeriesDocument } from './series.schema';
import { NotFoundException } from '@nestjs/common';
import SeriesDto from './dto/series.dto';
import { User } from '../users/user.schema';

@Injectable()
class SeriesService {
  constructor(
    @InjectModel(Series.name) private seriesModel: Model<SeriesDocument>,
  ) {}

  async findAll() {
    return this.seriesModel.find().populate('author');
  }

  async findOne(id: string) {
    const series = await this.seriesModel.findById(id).populate('author');
    if (!series) {
      throw new NotFoundException();
    }
    return series;
  }

  create(seriesData: SeriesDto, author: User) {
    const createdSeries = new this.seriesModel({
      ...seriesData,
      author,
    });
    return createdSeries.save();
  }

  async update(id: string, seriesData: SeriesDto) {
    const series = await this.seriesModel
      .findByIdAndUpdate(id, seriesData)
      .setOptions({ overwrite: true, new: true });
    if (!series) {
      throw new NotFoundException();
    }
    return series;
  }

  async delete(seriesId: string) {
    const result = await this.seriesModel.findByIdAndDelete(seriesId);
    if (!result) {
      throw new NotFoundException();
    }
  }
}

export default SeriesService;
