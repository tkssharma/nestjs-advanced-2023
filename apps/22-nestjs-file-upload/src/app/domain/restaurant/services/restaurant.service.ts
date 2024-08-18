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
import { v4 as uuidv4 } from 'uuid';

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
import AWSS3Service from '../../../../lib/aws-s3/aws-s3.service';

@Injectable()
export class RestaurantService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(RestaurantEntity)
    private restaurantRepo: Repository<RestaurantEntity>,
    private readonly connection: Connection,
    private readonly s3: AWSS3Service,
  ) {}

  async getRestaurantById(param: getRestaurantByIdDto) {
    const { id } = param;
    const response = await this.restaurantRepo.findOne({
      where: { id },
      select: { id: true, name: true },
    });
    return response;
  }

  async upload(files: Array<Express.Multer.File>) {
    try {
      const fileuploadResults = [];
      for (const file of files) {
        const fileName = `${uuidv4()}-${file.originalname}`;
        const uploadFileResponse = await this.uploadS3(
          file.buffer,
          fileName,
          file.originalname,
        );
        fileuploadResults.push({
          ...uploadFileResponse,
          success: true,
        });
      }
      return fileuploadResults;
    } catch (err) {
      throw err;
    }
  }

  async uploadS3(file: Buffer, key: string, originalname: string) {
    return this.s3.upload(file, key, originalname);
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

  async createRestaurant(payload: CreateRestaurantBodyDto) {
    let createdRestaurant = null;
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      createdRestaurant = await this.createUserRestaurant(
        { ...payload, restaurant_address: payload.address },
        queryRunner,
      );
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
}
