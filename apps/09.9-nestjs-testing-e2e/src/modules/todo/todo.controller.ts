import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

import { DataBaseService } from '../database/database.service';
import { ToDo } from '../../models/ToDo';
import { TodoService } from './todo.service';

@ApiTags('ToDo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('all')
  async getAll(): Promise<ToDo[]> {
    return await this.todoService.getAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true })
  get(@Param() params: { id: string }): Promise<ToDo> {
    return this.todoService.get(params.id);
  }

  @Post()
  @ApiBody({})
  create(@Body() body: ToDo): Promise<ToDo> {
    return this.todoService.create(body);
  }

  @Put()
  @ApiBody({})
  update(@Body() body: ToDo): Promise<ToDo> {
    return this.todoService.update(body);
  }

  @Put('inactive/:id')
  @ApiParam({ name: 'id', required: true })
  markAsInActive(@Param() params: { id: string }): Promise<ToDo> {
    return this.todoService.markAsInActive(params.id);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', required: true })
  delete(@Param() params: { id: string }): Promise<boolean> {
    return this.todoService.delete(params.id);
  }
}
