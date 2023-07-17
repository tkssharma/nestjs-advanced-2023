import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import SeriesService from './series.service';
import ParamsWithId from '../utils/paramsWithId';
import SeriesDto from './dto/series.dto';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import RequestWithUser from '../authentication/requestWithUser.interface';
import MongooseClassSerializerInterceptor from '../utils/mongooseClassSerializer.interceptor';
import { Series } from './series.schema';

@Controller('series')
@UseInterceptors(MongooseClassSerializerInterceptor(Series))
export default class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @Get()
  async getAllSeries() {
    return this.seriesService.findAll();
  }

  @Get(':id')
  async getSeries(@Param() { id }: ParamsWithId) {
    return this.seriesService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createSeries(@Body() series: SeriesDto, @Req() req: RequestWithUser) {
    return this.seriesService.create(series, req.user);
  }

  @Delete(':id')
  async deleteSeries(@Param() { id }: ParamsWithId) {
    return this.seriesService.delete(id);
  }

  @Put(':id')
  async updateSeries(@Param() { id }: ParamsWithId, @Body() series: SeriesDto) {
    return this.seriesService.update(id, series);
  }
}
