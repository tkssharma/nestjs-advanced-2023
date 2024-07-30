import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

const httpMocks = require('node-mocks-http');

import { User } from '../../auth/models/user.class';

import { ProductService } from './product.service';
import { Product } from '../models/product.interface';
import { ProductEntity } from '../models/product.entity';

describe('ProductService', () => {
  let productService: ProductService;

  const mockRequest = httpMocks.createRequest();
  mockRequest.user = new User();
  mockRequest.user.firstName = 'Poland';

  const mockProduct: Product = {
    body: 'body',
    createdAt: new Date(),
    creator: mockRequest.user,
  };

  const mockProductRepository = {
    createProduct: jest
      .fn()
      .mockImplementation((user: User, product: Product) => {
        return {
          ...product,
          creator: user,
        };
      }),
    save: jest
      .fn()
      .mockImplementation((product: Product) =>
        Promise.resolve({ id: 1, ...product }),
      ),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: mockProductRepository,
        },
      ],
    }).compile();
    productService = moduleRef.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });

  it('should create a product', (done: jest.DoneCallback) => {
    productService
      .createProduct(mockRequest.user, mockProduct)
      // subscribe to the observable in the product service
      .subscribe((product: Product) => {
        expect(product).toEqual({
          id: expect.any(Number),
          ...mockProduct,
        });
        done();
      });
  });
});
