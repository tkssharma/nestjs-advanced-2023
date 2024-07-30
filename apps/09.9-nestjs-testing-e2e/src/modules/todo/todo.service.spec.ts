import { Test, TestingModule } from '@nestjs/testing';
import { ToDo } from 'src/models/ToDo';
import { TodoModule } from './todo.module';
import { TodoService } from './todo.service';
import { DataBaseService } from '../database/database.service';

describe('TodoService', () => {
  let service: TodoService;

  const mockDataBaseService = {
    getAll: jest.fn(),
    get: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TodoModule],
    })
      .overrideProvider(DataBaseService)
      .useValue(mockDataBaseService)
      .compile();

    service = module.get<TodoService>(TodoService);
  });

  it('should have the service defined', () => {
    expect(service).toBeDefined();
  });

  describe('#getAll', () => {
    beforeEach(() => {
      jest.spyOn(mockDataBaseService, 'getAll');
    });

    it('should be defined', () => {
      expect(service.getAll).toBeDefined();
    });

    it('should call the database', () => {
      service.getAll();
      expect(mockDataBaseService.getAll).toBeCalledTimes(1);
    });
  });

  describe('#get', () => {
    beforeEach(() => {
      jest.spyOn(mockDataBaseService, 'get');
    });

    it('should be defined', () => {
      expect(service.get).toBeDefined();
    });

    it('should call the database', () => {
      service.get('1');
      expect(mockDataBaseService.get).toBeCalledTimes(1);
    });
  });

  describe('#create', () => {
    beforeEach(() => {
      jest.spyOn(mockDataBaseService, 'create');
    });

    it('should be defined', () => {
      expect(service.create).toBeDefined();
    });

    it('should call the database', () => {
      service.create({} as ToDo);
      expect(mockDataBaseService.create).toBeCalledTimes(1);
    });
  });

  describe('#update', () => {
    beforeEach(() => {
      jest.spyOn(mockDataBaseService, 'update');
    });

    it('should be defined', () => {
      expect(service.update).toBeDefined();
    });

    it('should call the database', () => {
      service.update({} as ToDo);
      expect(mockDataBaseService.update).toBeCalledTimes(1);
    });
  });

  describe('#delete', () => {
    beforeEach(() => {
      jest.spyOn(mockDataBaseService, 'delete');
    });

    it('should be defined', () => {
      expect(service.delete).toBeDefined();
    });

    it('should call the database', () => {
      service.delete('1');
      expect(mockDataBaseService.delete).toBeCalledTimes(1);
    });
  });

  describe('#markAsInActive', () => {
    beforeEach(() => {
      jest.spyOn(mockDataBaseService, 'get');
      jest.spyOn(mockDataBaseService, 'update');
    });

    it('should be defined', () => {
      expect(service.markAsInActive).toBeDefined();
    });

    describe('when inactive is called', () => {
      it('should call the databaseService.get', () => {
        expect(mockDataBaseService.get).toBeCalledTimes(1);
      });

      it('should call the databaseService.update', () => {
        expect(mockDataBaseService.update).toBeCalledTimes(1);
      });
    });
  });
});
