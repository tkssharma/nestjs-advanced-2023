import { Injectable } from '@nestjs/common';
import CreateCategoryDto from './dto/createCategory.dto';
import UpdateCategoryDto from './dto/updateCategory.dto';
import CategoryNotFoundException from './exceptions/categoryNotFound.exception';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaError } from '../utils/prismaError';

@Injectable()
export default class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  getAllCategories() {
    return this.prismaService.category.findMany();
  }

  async getCategoryById(id: number) {
    const category = await this.prismaService.category.findUnique({
      where: {
        id,
      },
    });
    if (!category) {
      throw new CategoryNotFoundException(id);
    }
    return category;
  }

  async createCategory(category: CreateCategoryDto) {
    return this.prismaService.category.create({
      data: category,
    });
  }

  async updateCategory(id: number, category: UpdateCategoryDto) {
    try {
      return await this.prismaService.category.update({
        data: {
          ...category,
          id: undefined,
        },
        where: {
          id,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new CategoryNotFoundException(id);
      }
      throw error;
    }
  }

  async deleteCategory(id: number) {
    try {
      return this.prismaService.category.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new CategoryNotFoundException(id);
      }
      throw error;
    }
  }
}
