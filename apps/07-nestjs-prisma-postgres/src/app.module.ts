import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { AuthenticationModule } from './authentication/authentication.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    AuthenticationModule,
    CategoriesModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
