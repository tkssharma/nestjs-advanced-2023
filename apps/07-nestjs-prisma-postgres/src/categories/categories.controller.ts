import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Post,
} from '@nestjs/common';
import CategoriesService from './categories.service';
import CreateCategoryDto from './dto/createCategory.dto';
import UpdateCategoryDto from './dto/updateCategory.dto';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import { FindOneParams } from '../utils/findOneParams';

@Controller('categories')
@UseInterceptors(ClassSerializerInterceptor)
export default class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Get(':id')
  getCategoryById(@Param() { id }: FindOneParams) {
    return this.categoriesService.getCategoryById(id);
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createCategory(@Body() category: CreateCategoryDto) {
    return this.categoriesService.createCategory(category);
  }

  @Patch(':id')
  async updateCategory(
    @Param() { id }: FindOneParams,
    @Body() category: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(id, category);
  }

  @Delete(':id')
  async deleteCategory(@Param() { id }: FindOneParams) {
    return this.categoriesService.deleteCategory(id);
  }
}
