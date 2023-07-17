import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import CategoriesController from './categories.controller';
import CategoriesService from './categories.service';
import { Category, CategorySchema } from './category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
class CategoriesModule {}

export default CategoriesModule;
