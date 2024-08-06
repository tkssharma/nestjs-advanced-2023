import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import 'mocha';
import * as request from 'supertest';
import { AppModule } from '../../src/app/app.module';

describe('Swagger (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  afterEach(async () => {
    await app.close();
  });
  it('/api (GET)', () => {
    return request(app.getHttpServer())
      .get('/api')
      .expect(404)
      .responseType('application/json');
  });

  it('/api/v1/health (GET)', async () => {
    const res = await request(app.getHttpServer()).get('/api/v1/health').send();
    expect(res.status).toBeDefined();
  });
});
