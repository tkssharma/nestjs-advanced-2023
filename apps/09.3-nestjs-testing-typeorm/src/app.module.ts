import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatModule } from './cat/cat.module';
import { DBModule } from '@dev/database';
import { Cat } from './cat/cat.entity';

@Module({
  imports: [
    DBModule.forRoot({
      entities: [Cat],
    }),
    CatModule,
  ],
})
export class AppModule {}
