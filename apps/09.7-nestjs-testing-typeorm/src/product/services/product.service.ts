import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { User } from 'src/auth/models/user.class';
import { ProductEntity } from '../models/product.entity';
import { Product } from '../models/product.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  createProduct(user: User, product: Product): Observable<Product> {
    product.creator = user;
    return from(this.productRepository.save(product));
  }

  findAllProducts(): Observable<Product[]> {
    return from(this.productRepository.find());
  }

  findProducts(take: number = 10, skip: number = 0): Observable<Product[]> {
    return from(
      this.productRepository
        .createQueryBuilder('product')
        .innerJoinAndSelect('product.creator', 'creator')
        .orderBy('product.createdAt', 'DESC')
        .take(take)
        .skip(skip)
        .getMany(),
    );
  }

  updateProduct(id: number, product: Product): Observable<UpdateResult> {
    return from(this.productRepository.update(id, product));
  }

  deleteProduct(id: number): Observable<DeleteResult> {
    return from(this.productRepository.delete(id));
  }
  findProductById(id: number): Observable<Product> {
    return from(
      this.productRepository.findOne({
        where: { id },
        relations: ['creator'],
      }),
    );
  }
}
