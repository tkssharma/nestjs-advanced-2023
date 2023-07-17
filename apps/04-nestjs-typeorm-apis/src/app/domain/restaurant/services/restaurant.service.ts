import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from "@dev/config";
import { Logger } from "@dev/logger";
import {
  Like,
  Repository,
  Connection,
  QueryRunner,
  NotBrackets,
  Brackets,
  DataSource,
} from "typeorm";

import { NotFoundException } from "@nestjs/common";
import { RestaurantEntity } from "../entity/restaurant.entity";
import {
  AddressDto,
  CreateRestaurantBodyDto,
  SearchQueryDto,
  getRestaurantByIdDto,
} from "../dto/restaurant.dto";
import { RestaurantAddressEntity } from "../entity/restaurant.address.entity";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { UserMetaData } from "@dev/auth";
import { off } from "process";
import { groupBy } from "../utility";

@Injectable()
export class RestaurantService {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(RestaurantEntity)
    private restaurantRepo: Repository<RestaurantEntity>,
    @InjectRepository(RestaurantAddressEntity)
    private restaurantAddRepo: Repository<RestaurantAddressEntity>,
    private readonly connection: Connection,
    private configService: ConfigService,
    private eventEmitter: EventEmitter2
  ) {}

  async getRestaurantById(param: getRestaurantByIdDto) {
    const { id } = param;
    const response = await this.restaurantRepo.findOne({
      where: { id },
      relations: ["dishes"],
    });
    const address = await this.restaurantAddRepo.findOne({
      where: { restaurant: { id } },
    });
    const dishMenuItems = response.dishes;
    const categories = groupBy(dishMenuItems, "category");
    response.dishes = categories;
    response.address = address;
    return response;
  }

  async getAllMyRestaurants(user: UserMetaData) {
    const { uid } = user;
    return await this.restaurantRepo.find({
      where: { owner_id: uid },
      relations: ["dishes"],
    });
  }

  async search(queryParam: SearchQueryDto) {
    const { search_text, limit, page } = queryParam;
    const offset = limit * (page - 1);
    const query = this.connection
      .getRepository(RestaurantEntity)
      .createQueryBuilder("restaurant")
      .leftJoinAndSelect("restaurant.dishes", "dishes");

    if (search_text) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where("dishes.name like :name", { name: `%${search_text}%` })
            .orWhere("dishes.description like :q", { q: `%${search_text}%` })
            .orWhere("restaurant.description like :description", {
              description: `%${search_text}%`,
            })
            .orWhere("restaurant.name like :name", {
              name: `%${search_text}%`,
            });
        })
      );
    }
    return await query
      .skip(offset || 0)
      .take(limit || 10)
      .getMany();
  }

  async createRestaurant(user: UserMetaData, payload: CreateRestaurantBodyDto) {
    let createdRestaurant = null;
    console.log(payload);
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      createdRestaurant = await this.createUserRestaurant(
        payload,
        user,
        queryRunner
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
  async createUserRestaurant(
    payload,
    user: UserMetaData,
    queryRunner: QueryRunner
  ) {
    return await queryRunner.manager.save(RestaurantEntity, {
      owner_id: user.uid,
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
