require("dotenv").config();
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { createDocument } from "./docs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = "api/v1";
  app.setGlobalPrefix(globalPrefix);

  app.use((req, _, next) => {
    //console.log(`Got invoked: '${req.originalUrl}'`);
    next();
  });
  createDocument(app);
  await app.listen(process.env.PORT || 3002);
}
bootstrap();
