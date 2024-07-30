import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductController } from './product/controllers/product.controller';
import { APP_FILTER } from '@nestjs/core';
import { AuthController } from './auth/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { AllExceptionsFilter } from './core/all-exceptions.filter';
import { DBModule } from '@dev/database';
import { UserEntity } from './auth/models/user.entity';
import { ProductEntity } from './product/models/product.entity';

@Module({
  imports: [
    DBModule.forRoot({
      entities: [UserEntity, ProductEntity],
    }),
    ProductModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
