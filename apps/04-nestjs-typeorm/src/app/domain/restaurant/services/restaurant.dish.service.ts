import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@dev/config';
import { Logger } from '@dev/logger';
import { Like, Repository, Connection, QueryRunner, Brackets } from 'typeorm';

import { NotFoundException } from '@nestjs/common';
import { RestaurantEntity } from '../entity/restaurant.entity';
import {
  AddressDto,
  CreateRestaurantBodyDto,
  SearchQueryDto,
  getRestaurantByIdDto,
} from '../dto/restaurant.dto';
import { RestaurantAddressEntity } from '../entity/restaurant.address.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RestaurantDishEntity } from '../entity/restaurant.dish.entity';
import {
  CreateRestaurantDishBodyDto,
  OrderBy,
  SearchDishQueryDto,
  UpdateRestaurantDishBodyDto,
  filterType,
  getRestaurantDishByIdDto,
} from '../dto/restaurant.dish.dto';

@Injectable()
export class RestaurantDishService {
  constructor(
    private readonly logger: Logger,
    private readonly connection: Connection,
    @InjectRepository(RestaurantEntity)
    private restaurantRepo: Repository<RestaurantEntity>,
    @InjectRepository(RestaurantDishEntity)
    private restaurantDishRepo: Repository<RestaurantDishEntity>,
    private configService: ConfigService,
    private eventEmitter: EventEmitter2,
  ) {}

  async listRestaurantDish(params: SearchDishQueryDto): Promise<any[]> {
    const { search_text, page, limit, filter_type, order_by } = params;
    const offset = limit * (page - 1);
    const query = this.connection
      .getRepository(RestaurantDishEntity)
      .createQueryBuilder('restaurant_dishes')
      .leftJoinAndSelect('restaurant_dishes.restaurant', 'restaurants');

    if (search_text) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('restaurant_dishes.name like :name', {
            name: `%${search_text}%`,
          })
            .orWhere('restaurant_dishes.description like :description', {
              description: `%${search_text}%`,
            })
            .orWhere('restaurant_dishes.ingredients like :q', {
              q: `%${search_text}%`,
            });
        }),
      );
    }
    if (filter_type === filterType.price) {
      query.orderBy(
        'restaurant_dishes.price',
        order_by ? (order_by as OrderBy) : 'ASC',
      );
    } else if (filter_type === filterType.delivery_time) {
      query.orderBy(
        'restaurant_dishes.delivery_time',
        order_by ? (order_by as OrderBy) : 'ASC',
      );
    } else if (filter_type === filterType.rating) {
      query.orderBy(
        'restaurant_dishes.rating',
        order_by ? (order_by as OrderBy) : 'ASC',
      );
    }
    const data = await query.skip(offset).limit(limit).getMany();
    return data;
  }

  async validateAuthorization(user, param) {
    const { uid } = user;
    const { id } = param;
    const restaurant = await this.restaurantRepo.findOne({ where: { id } });
    if (!restaurant) {
      throw new NotFoundException(`restaurant not found with id ${id}`);
    }
    if (restaurant.owner_id !== uid) {
      throw new UnauthorizedException(
        `you are not authorized to access restaurant${id}`,
      );
    }
    return restaurant;
  }

  async createRestaurantDish(
    user: UserMetaData,
    param: getRestaurantByIdDto,
    payload: CreateRestaurantDishBodyDto,
  ) {
    const restaurant = await this.validateAuthorization(user, param);
    return await this.restaurantDishRepo.save({
      ...payload,
      restaurant,
    });
  }

  async updateRestaurantDish(
    user: UserMetaData,
    param: getRestaurantDishByIdDto,
    payload: UpdateRestaurantDishBodyDto,
  ) {
    const { dish_id } = param;
    const restaurant = await this.validateAuthorization(user, param);
    const dish = await this.restaurantDishRepo.findOne({
      where: { id: dish_id },
    });
    if (!dish) {
      throw new NotFoundException();
    }
    return await this.restaurantDishRepo.save({
      ...dish,
      ...payload,
    });
  }

  async deleteRestaurantDish(
    user: UserMetaData,
    param: getRestaurantDishByIdDto,
  ) {
    const { dish_id } = param;
    const restaurant = await this.validateAuthorization(user, param);
    const dish = await this.restaurantDishRepo.findOne({
      where: { id: dish_id },
    });
    if (!dish) {
      throw new NotFoundException();
    }
    await this.restaurantDishRepo.delete({ id: dish.id });
  }
}
