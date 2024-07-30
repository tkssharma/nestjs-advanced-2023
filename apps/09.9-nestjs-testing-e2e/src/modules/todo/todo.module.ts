import { Module } from '@nestjs/common';
import { DataBaseService } from '../database/database.service';
import { ToDo } from '../../models/ToDo';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  controllers: [TodoController],
  providers: [TodoService, DataBaseService],
})
export class TodoModule {}
