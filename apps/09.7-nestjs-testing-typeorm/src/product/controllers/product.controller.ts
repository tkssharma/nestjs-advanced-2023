import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';

import { JwtGuard } from '../../auth/guards/jwt.guard';
import { Product } from '../models/product.interface';
import { ProductService } from '../services/product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() product: Product, @Request() req): Observable<Product> {
    return this.productService.createProduct(req.user, product);
  }

  @UseGuards(JwtGuard)
  @Get()
  findSelected(
    @Query('take') take: number = 1,
    @Query('skip') skip: number = 1,
  ): Observable<Product[]> {
    take = take > 20 ? 20 : take;
    return this.productService.findProducts(take, skip);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() product: Product,
  ): Observable<UpdateResult> {
    return this.productService.updateProduct(id, product);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.productService.deleteProduct(id);
  }
}
