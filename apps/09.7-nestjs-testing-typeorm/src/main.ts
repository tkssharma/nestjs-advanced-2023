require('dotenv/config');
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createDocument } from './swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  createDocument(app);
  await app.listen(process.env.PORT || 3010);
}
bootstrap();
