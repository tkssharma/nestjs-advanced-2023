import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { DataBaseService } from '../src/modules/database/database.service';

describe('TodoModule', () => {
  let app: INestApplication;

  const mockDataBaseService = {
    getAll: jest.fn(),
    get: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DataBaseService)
      .useValue(mockDataBaseService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET: todo/:id', () => {
    it('should return OK', async () => {
      await request(app.getHttpServer()).get('/todo/1').expect(200, {});
    });
  });

  describe('GET: todo/all', () => {
    it('should return OK', async () => {
      await request(app.getHttpServer()).get('/todo/all').expect(200, {});
    });
  });

  describe('POST: todo', () => {
    it('should return OK', async () => {
      await request(app.getHttpServer()).post('/todo').expect(201, {});
    });
  });

  describe('PUT: todo', () => {
    beforeEach(() => {
      jest.spyOn(mockDataBaseService, 'update');
    });

    it('should return OK', async () => {
      await request(app.getHttpServer()).put('/todo').expect(200, {});
    });
  });

  describe('PUT: todo/inactive/:id', () => {
    beforeEach(() => {
      jest
        .spyOn(mockDataBaseService, 'get')
        .mockReturnValue(Promise.resolve({}));
      jest.spyOn(mockDataBaseService, 'update');
    });

    it('should return OK', async () => {
      await request(app.getHttpServer())
        .put('/todo/inactive/:id')
        .expect(200, {});
    });
  });

  describe('DELETE: todo/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockDataBaseService, 'delete');
    });

    it('should return OK', async () => {
      await request(app.getHttpServer()).delete('/todo/:id').expect(200, {});
    });
  });
});
