import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/app/app.module';
import { DatabaseService } from '../../../src/db/db.service';
import { TestUtils } from '../../utils';
import AuthService from '../../../src/app/auth/auth-service';

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
});
