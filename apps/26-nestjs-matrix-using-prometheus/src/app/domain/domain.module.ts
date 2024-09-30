import {
  MiddlewareConsumer,
  Module,
  NestMiddleware,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { RestaurantEntity } from './restaurant/entity/restaurant.entity';
import { RestaurantController } from './restaurant/controller/restaurant.controller';
import { RestaurantService } from '@domain/restaurant/services/restaurant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthController } from '../controllers/app.controller';
import { AuthMiddleware } from '@auth/auth-middleware';
import { RouteInfo } from '@nestjs/common/interfaces';
import { AuthModule } from '../auth/auth.module';
import {
  makeCounterProvider,
  makeGaugeProvider,
  PrometheusModule,
} from '@willsoto/nestjs-prometheus';
import { CustomMetricsMiddleware } from '../matrix/matrix.middleware';

@Module({
  imports: [
    PrometheusModule.register({
      path: '/metrics',
    }),
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://api:development_pass@localhost:5432/test-api',
      synchronize: true,
      entities: [RestaurantEntity],
    }),
    TypeOrmModule.forFeature([RestaurantEntity]),
  ],
  controllers: [RestaurantController, HealthController],
  providers: [
    RestaurantService,
    AuthMiddleware,
    makeCounterProvider({
      name: 'count',
      help: 'metric_help',
      labelNames: ['method', 'origin'] as string[],
    }),
    makeGaugeProvider({
      name: 'gauge',
      help: 'metric_help',
    }),
  ],
})
export class DomainModule implements NestModule {
  public publicRoutes: Array<RouteInfo> = [
    {
      path: `/health`,
      method: RequestMethod.GET,
    },
  ];

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CustomMetricsMiddleware).forRoutes('/restaurants');

    // apply auth middleware to all except health check route
    consumer
      .apply(AuthMiddleware)
      .exclude(...this.publicRoutes)
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}
