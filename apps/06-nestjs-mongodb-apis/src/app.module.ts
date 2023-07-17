import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import PostsModule from './posts/posts.module';
import { AuthenticationModule } from './authentication/authentication.module';
import CategoriesModule from './categories/categories.module';
import SeriesModule from './series/series.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        ENV: Joi.string().required(),
        MONGO_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get('MONGO_URI');
        return {
          uri,
        };
      },
    }),
    PostsModule,
    AuthenticationModule,
    CategoriesModule,
    SeriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
