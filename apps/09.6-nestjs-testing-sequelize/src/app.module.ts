import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { url } from 'inspector';

@Module({
  imports: [
    SequelizeModule.forRoot({
      uri: 'postgres://api:development_pass@localhost:5432/test-api',
      synchronize: true,
      logging: true,
    }),
    CatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
