import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './category.schema';
import { NotFoundException } from '@nestjs/common';
import CategoryDto from './dto/category.dto';
import { User } from '../users/user.schema';

@Injectable()
class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async findAll() {
    return this.categoryModel.find().populate('author');
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findById(id).populate('author');
    if (!category) {
      throw new NotFoundException();
    }
    return category;
  }

  create(categoryData: CategoryDto, author: User) {
    const createdCategory = new this.categoryModel({
      ...categoryData,
      author,
    });
    return createdCategory.save();
  }

  async update(id: string, categoryData: CategoryDto) {
    const category = await this.categoryModel
      .findByIdAndUpdate(id, categoryData)
      .setOptions({ overwrite: true, new: true });
    if (!category) {
      throw new NotFoundException();
    }
    return category;
  }

  async delete(categoryId: string) {
    const result = await this.categoryModel.findByIdAndDelete(categoryId);
    if (!result) {
      throw new NotFoundException();
    }
  }
}

export default CategoriesService;
