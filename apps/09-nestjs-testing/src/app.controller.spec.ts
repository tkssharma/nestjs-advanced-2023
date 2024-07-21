import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  // mocking using custom provider
  const mock = {
    getHelloFromDB: jest.fn(() => 'Hi'),
    getHello: jest.fn(() => 'Hi'),
  };
  const AppServiceProvider = {
    provide: AppService,
    useFactory: () => ({
      getHelloFromDB: jest.fn(() => 'Hi'),
      getHello: jest.fn(() => 'Hi'),
    }),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppServiceProvider],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  // its a simple service so no need to mock service here
  describe('root', () => {
    it('should return "hi World!"', () => {
      console.log('Hello');
      expect(appController.getHello()).toBe('Hi');
    });
    it('should return "hi World!"', () => {
      expect(appController.getHelloFromDB()).toBe('Hi');
    });
  });
});
