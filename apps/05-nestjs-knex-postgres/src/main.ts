import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { createDocument } from './swagger/swagger';
import { SwaggerModule } from '@nestjs/swagger';
require('dotenv').config();

import 'reflect-metadata';
(async () => {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  SwaggerModule.setup('api/v1', app, createDocument(app));
  await app.listen(process.env.port || 3000);
  console.info('SERVER IS RUNNING ON PORT', process.env.port || 3000);
})();
