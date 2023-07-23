import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@dev/config';
import { AppLoggerModule } from '@dev/logger';
import { DBModule } from '@dev/database';
import { RestaurantAddressEntity } from './restaurant/entity/restaurant.address.entity';
import { RestaurantDishEntity } from './restaurant/entity/restaurant.dish.entity';
import { RestaurantEntity } from './restaurant/entity/restaurant.entity';
import { RestaurantController } from './restaurant/controller/restaurant.controller';
import { RestaurantService } from './restaurant/services/restaurant.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventEmitterModule } from '@nestjs/event-emitter';
import { RestaurantDishController } from './restaurant/controller/restaurant.dish.controller';
import { RestaurantDishService } from './restaurant/services/restaurant.dish.service';
import { DishController } from './restaurant/controller/dish.controller';
import { GithubModule } from './github/github.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    GithubModule,
    TypeOrmModule.forFeature([
      RestaurantEntity,
      RestaurantDishEntity,
      RestaurantAddressEntity,
    ]),
    DBModule.forRoot({
      entities: [
        RestaurantAddressEntity,
        RestaurantEntity,
        RestaurantDishEntity,
      ],
    }),
    TerminusModule,
    AppLoggerModule,
    ConfigModule,
  ],
  controllers: [RestaurantController, RestaurantDishController, DishController],
  providers: [RestaurantService, RestaurantDishService],
})
export class DomainModule {}
