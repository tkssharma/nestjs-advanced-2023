import { Module } from '@nestjs/common';
import { RestaurantEntity } from './restaurant/entity/restaurant.entity';
import { RestaurantController } from './restaurant/controller/restaurant.controller';
import { RestaurantService } from './restaurant/services/restaurant.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://api:development_pass@localhost:5432/test-api',
      synchronize: true,
      entities: [RestaurantEntity],
    }),
    TypeOrmModule.forFeature([RestaurantEntity]),
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class DomainModule {}
