import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
import { off } from 'process';
import { groupBy } from '../utility';
import { UserMetaData } from '../interface';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(RestaurantEntity)
    private restaurantRepo: Repository<RestaurantEntity>,
  ) {}

  async getRestaurantById(param: getRestaurantByIdDto) {
    const { id } = param;
    const response = await this.restaurantRepo.findOne({
      where: { id },
      select: { id: true, name: true },
    });
    return response;
  }

  async getAllMyRestaurants(user: UserMetaData) {
    return await this.restaurantRepo.find({});
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
      take: 5,
      skip: 0,
    });
  }
}
