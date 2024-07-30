import { Injectable } from '@nestjs/common';

import { ToDo } from 'src/models/ToDo';

@Injectable()
export class DataBaseService {
  data: ToDo[] = [
    {
      id: '1',
      description: 'Cook pasta',
      is_active: true,
      created_at: new Date(),
    },
    {
      id: '2',
      description: 'Do laundry',
      is_active: true,
      created_at: new Date(),
    },
    {
      id: '3',
      description: 'Clean kitchen',
      is_active: false,
      created_at: new Date(),
    },
  ];

  getAll(): Promise<ToDo[]> {
    return Promise.resolve(this.data);
  }

  get(id: string): Promise<ToDo> {
    return Promise.resolve(this.data.filter((t) => t.id === id)[0]);
  }

  create(todo: ToDo): Promise<ToDo> {
    this.data.push(todo);
    return Promise.resolve(todo);
  }

  update(todo: ToDo): Promise<ToDo> {
    const dataIndex = this.data.findIndex((t) => t.id === todo.id);
    this.data[dataIndex] = todo;
    return Promise.resolve(this.data[dataIndex]);
  }

  delete(id: string): Promise<boolean> {
    this.data = this.data.filter((t) => t.id !== id);
    return Promise.resolve(true);
  }
}
