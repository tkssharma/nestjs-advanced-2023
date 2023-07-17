import { Module } from '@nestjs/common';
import CategoriesController from './categories.controller';
import CategoriesService from './categories.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
