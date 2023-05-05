import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

import { MyLoggerService } from "./logger.service";
import { LoggerMiddleware } from "./logger.middleware";

@Module({
  imports: [],
  controllers: [],
  providers: [MyLoggerService],
  exports: [MyLoggerService],
})
export class AppLoggerModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
