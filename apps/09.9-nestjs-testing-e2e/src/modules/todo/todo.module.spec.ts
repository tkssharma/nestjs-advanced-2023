import { Test, TestingModule } from '@nestjs/testing';

import { TodoController } from './Todo.controller';
import { TodoModule } from './Todo.module';
import { TodoService } from './Todo.service';

describe('TodoModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TodoModule],
    }).compile();
  });

  it('should compile the module', async () => {
    expect(module).toBeDefined();
  });

  it('should have Todo components', async () => {
    expect(module.get(TodoController)).toBeInstanceOf(TodoController);
    expect(module.get(TodoService)).toBeInstanceOf(TodoService);
  });
});
