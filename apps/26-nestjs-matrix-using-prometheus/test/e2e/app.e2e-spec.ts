import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app/app.module';
import AuthService from 'src/app/auth/auth-service';

describe('API endpoints testing (e2e)', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.enableShutdownHooks();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterEach(async () => {
    //  await app.close();
  });
  it('/health (GET)', async () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .responseType('application/json');
  });
});
