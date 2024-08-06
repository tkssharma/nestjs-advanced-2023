import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/app/app.module';
import { DatabaseService } from '../../../src/db/db.service';
import { TestUtils } from '../../utils';
import AuthService from '../../../src/app/auth/auth-service';
import * as request from 'supertest';
import { restaurants } from '../../mock';

describe('/restaurants (POST) :: Happy Path', () => {
  let app: INestApplication;
  let testUtils: TestUtils;
  let moduleRef: TestingModule;
  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [TestUtils, DatabaseService],
    })
      // bypass auth process and access api directly in tests
      .overrideProvider(AuthService)
      .useValue({
        init: (token: string) => testUtils.getRandomUser(token),
      })
      .compile();

    app = moduleRef.createNestApplication();
    testUtils = moduleRef.get<TestUtils>(TestUtils);
    await testUtils.reloadFixtures();
    // cleanup db after each suit runs
    await app.init();
  });

  afterEach(async () => {
    await testUtils.close();
  });
  it('/restaurants (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/restaurants')
      .set({ Authorization: 'auth token' })
      .send(restaurants);
    expect(response.status).toBe(201);

    const response2 = await request(app.getHttpServer())
      .post('/restaurants')
      .set({ Authorization: 'auth token' })
      .send(restaurants);
    expect(response2.status).toBe(201);
    // created two times

    const response1 = await request(app.getHttpServer())
      .get('/restaurants')
      .set({ Authorization: 'auth token' });
    expect(response1.body.length).toBe(2);
  });
  it('/restaurants (GET)', async () => {
    const resp = await request(app.getHttpServer())
      .get('/restaurants')
      .set({ Authorization: 'auth token' });
    expect(resp.body.length).toBe(0);

    const resp2 = await request(app.getHttpServer())
      .post('/restaurants')
      .set({ Authorization: 'auth token' })
      .send(restaurants);
    expect(resp2.status).toBe(201);

    const resp3 = await request(app.getHttpServer())
      .get('/restaurants')
      .set({ Authorization: 'auth token' });
    expect(resp3.body.length).toBe(1);
  });
});
