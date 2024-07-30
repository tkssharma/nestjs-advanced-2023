import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import 'mocha';
import * as request from 'supertest';
import { AppModule } from '../../../src/app/app.module';
import AuthService from '../../../src/app/auth/services/auth.service';
import BlobUploadService from '../../../src/app/blob/azure-file-upload.service';
import { DatabaseService } from '../../../src/db/db.service';
import { TestUtils } from '../../utils';
import { ContractPayload } from '../../fixtures/contract';
import { AUTH_FIXTURES } from '../../fixtures/fixtures';

describe('Contracts List /api/v1/contracts (POST) :: Happy Path', () => {
  let app: INestApplication;
  let testUtils: TestUtils;
  let moduleRef: TestingModule;
  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [TestUtils, DatabaseService],
    })
      .overrideProvider(AuthService)
      .useValue({
        init: (token: string) => testUtils.getRandomUser(token),
      })
      .compile();

    app = moduleRef.createNestApplication();
    testUtils = moduleRef.get<TestUtils>(TestUtils);
    await testUtils.reloadFixtures();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
    await testUtils.closeDbConnection();
  });
  it('contracts should be created by admin only and purchaser should not be able to access contract of another purchaser', async () => {
    const resp = await request(app.getHttpServer())
      .post('/api/v1/contracts')
      .set({ Authorization: AUTH_FIXTURES.mockValidToken_User })
      .send(ContractPayload);
    expect(resp.status).equal(403);

    const resp1 = await request(app.getHttpServer())
      .post('/api/v1/contracts')
      .set({ Authorization: AUTH_FIXTURES.mockValidToken_User1 })
      .send(ContractPayload);
    expect(resp1.status).equal(201);
    const contractId1 = resp1 && resp1.body.id;

    const response1 = await request(app.getHttpServer())
      .get(`/api/v1/contracts/${contractId1}`)
      .set({ Authorization: AUTH_FIXTURES.mockValidToken_User1 })
      .send();
    expect(response1.status).equal(200);

    const resp2 = await request(app.getHttpServer())
      .post(`/api/v1/contracts`)
      .set({ Authorization: AUTH_FIXTURES.mockValidToken_User2 })
      .send(ContractPayload);
    expect(resp2.status).equal(201);
    const contractId2 = resp2 && resp2.body.id;

    const response2 = await request(app.getHttpServer())
      .get(`/api/v1/contracts/${contractId2}`)
      .set({ Authorization: AUTH_FIXTURES.mockValidToken_User2 })
      .send();
    expect(response2.status).equal(200);

    const response3 = await request(app.getHttpServer())
      .get(`/api/v1/contracts/${contractId1}`)
      .set({ Authorization: AUTH_FIXTURES.mockValidToken_User2 })
      .send();
    expect(response3.status).equal(401);
  });
});
