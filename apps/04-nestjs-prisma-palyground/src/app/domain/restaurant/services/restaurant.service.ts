import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@dev/config';
import {
  Like,
  Repository,
  Connection,
  QueryRunner,
  NotBrackets,
  Brackets,
  DataSource,
} from 'typeorm';

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
import { off } from 'process';
import { groupBy } from '../utility';
import { UserMetaData } from '../interface';
import { PrismaService } from '../../shared/prisma.service';

@Injectable()
export class RestaurantService {
  constructor(
    private prisma: PrismaService,
    private readonly dataSource: DataSource,
    @InjectRepository(RestaurantEntity)
    private restaurantRepo: Repository<RestaurantEntity>,
    @InjectRepository(RestaurantAddressEntity)
    private restaurantAddRepo: Repository<RestaurantAddressEntity>,
    private readonly connection: Connection,
    private configService: ConfigService,
    private eventEmitter: EventEmitter2,
  ) {}

  async getRestaurantById(param: getRestaurantByIdDto) {
    const { id } = param;
    const response = await this.restaurantRepo.findOne({
      where: { id },
      select: { id: true, name: true },
      relations: {
        dishes: true,
      },
    });
    const address = await this.restaurantAddRepo.findOne({
      where: { restaurant: { id } },
    });
    const dishMenuItems = response.dishes;
    const categories = groupBy(dishMenuItems, 'category');
    response.dishes = categories;
    response.address = address;
    return response;
  }

  async getAllMyRestaurants(user: UserMetaData) {
    return await this.restaurantRepo.find({
      relations: ['dishes'],
    });
  }

  async search(queryParam: SearchQueryDto) {
    return await this.restaurantRepo.find({
      select: {
        id: true,
        name: true,
        description: true,
        delivery_options: true,
      },
      where: [
        {
          name: Like(`%${queryParam.search_text}%`),
        },
        {
          description: Like(`%${queryParam.search_text}%`),
        },
      ],
      relations: {
        dishes: true,
      },
      take: 5,
      skip: 0,
    });

    /*
    const { search_text, limit, page } = queryParam;
    const offset = limit * (page - 1);
    const query = this.dataSource
      .getRepository(RestaurantEntity)
      .createQueryBuilder('restaurant')
      .leftJoinAndSelect('restaurant.dishes', 'dishes');

    if (search_text) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('dishes.name like :name', { name: `%${search_text}%` })
            .orWhere('dishes.description like :q', { q: `%${search_text}%` })
            .orWhere('restaurant.description like :description', {
              description: `%${search_text}%`,
            })
            .orWhere('restaurant.name like :name', {
              name: `%${search_text}%`,
            });
        }),
      );
    }
    return await query
      .skip(offset || 0)
      .take(limit || 10)
      .getMany();
  */
  }

  async createRestaurant(payload: CreateRestaurantBodyDto) {
    let createdRestaurant = null;
    console.log(payload);
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      createdRestaurant = await this.createUserRestaurant(
        { ...payload, restaurant_address: payload.address },
        queryRunner,
      );
      await this.createAddress(payload.address, createdRestaurant, queryRunner);
      await queryRunner.commitTransaction();
      return createdRestaurant;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
  async createUserRestaurant(payload, queryRunner: QueryRunner) {
    return await queryRunner.manager.save(RestaurantEntity, {
      ...payload,
    });
  }
  async createAddress(address: AddressDto, restaurant, queryRunner) {
    return await queryRunner.manager.save(RestaurantAddressEntity, {
      ...address,
      restaurant: restaurant,
    });
  }
}
