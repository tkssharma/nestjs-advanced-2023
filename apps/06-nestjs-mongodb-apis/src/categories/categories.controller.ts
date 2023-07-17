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
import CategoriesService from './categories.service';
import ParamsWithId from '../utils/paramsWithId';
import CategoryDto from './dto/category.dto';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import RequestWithUser from '../authentication/requestWithUser.interface';
import MongooseClassSerializerInterceptor from '../utils/mongooseClassSerializer.interceptor';
import { Category } from './category.schema';

@Controller('categories')
@UseInterceptors(MongooseClassSerializerInterceptor(Category))
export default class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAllCategories() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  async getCategory(@Param() { id }: ParamsWithId) {
    return this.categoriesService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createCategory(
    @Body() category: CategoryDto,
    @Req() req: RequestWithUser,
  ) {
    return this.categoriesService.create(category, req.user);
  }

  @Delete(':id')
  async deleteCategory(@Param() { id }: ParamsWithId) {
    return this.categoriesService.delete(id);
  }

  @Put(':id')
  async updateCategory(
    @Param() { id }: ParamsWithId,
    @Body() category: CategoryDto,
  ) {
    return this.categoriesService.update(id, category);
  }
}
