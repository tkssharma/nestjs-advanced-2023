import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../auth/models/user.class';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { UserService } from '../../auth/services/user.service';
import { ProductController } from './product.controller';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.interface';
import { DeleteResult, UpdateResult } from 'typeorm';

const httpMocks = require('node-mocks-http');

describe('ProductController', () => {
  let productController: ProductController;
  let productService: ProductService;
  let userService: UserService;

  const mockRequest = httpMocks.createRequest();
  mockRequest.user = new User();
  mockRequest.user = 'DUE';

  const mockProduct: Product = {
    body: 'nivea',
    createdAt: new Date(),
    creator: mockRequest.user,
  };

  const mockProducts: Product[] = [
    mockProduct,
    { ...mockProduct, body: 'Vanilla' },
    { ...mockProduct, body: 'Ice' },
  ];

  const mockDeleteResult: DeleteResult = {
    raw: [],
    affected: 1,
  };

  const mockUpdateResult: UpdateResult = {
    ...mockDeleteResult,
    generatedMaps: [],
  };

  const mockProductService = {
    createProduct: jest
      .fn()
      .mockImplementation((user: User, product: Product) => {
        return {
          id: 1,
          ...product,
        };
      }),
    findProducts: jest
      .fn()
      .mockImplementation((numberToTake: number, numberToSkip: number) => {
        const productsAfterSkipping = mockProducts.slice(numberToSkip);
        const filteredProducts = productsAfterSkipping.slice(0, numberToTake);
        return filteredProducts;
      }),
    updateProduct: jest.fn().mockImplementation(() => {
      return mockUpdateResult;
    }),
    deleteProduct: jest.fn().mockImplementation(() => {
      return mockDeleteResult;
    }),
  };
  const mockUserService = {};

  // create fake module
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        ProductService,
        { provide: UserService, useValue: mockUserService },
        {
          provide: JwtGuard,
          useValue: jest.fn().mockImplementation(() => true),
        },
      ],
    })
      .overrideProvider(ProductService)
      .useValue(mockProductService)
      .compile();

    productService = moduleRef.get<ProductService>(ProductService);
    userService = moduleRef.get<UserService>(UserService);
    productController = moduleRef.get<ProductController>(ProductController);
  });

  it('should get 2 products, skipping the first', () => {
    expect(productController.findSelected(2, 1)).toEqual(mockProducts.slice(1));
  });

  it('should create a product', () => {
    expect(productController.create(mockProduct, mockRequest)).toEqual({
      id: expect.any(Number),
      ...mockProduct,
    });
  });

  it('should update a product', () => {
    expect(
      productController.update(1, { ...mockProduct, body: 'updated product' }),
    ).toEqual(mockUpdateResult);
  });

  it('should delete a product', () => {
    expect(productController.delete(1)).toEqual(mockDeleteResult);
  });
});
