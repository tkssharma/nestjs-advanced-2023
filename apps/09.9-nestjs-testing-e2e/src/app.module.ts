import { Module } from '@nestjs/common';
import { TodoModule } from './modules/todo/todo.module';

@Module({
  imports: [TodoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
