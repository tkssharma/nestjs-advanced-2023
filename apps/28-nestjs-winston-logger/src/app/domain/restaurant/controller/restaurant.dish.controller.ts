// Native.
/* eslint-disable no-useless-escape */

// Package.
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Delete,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NO_ENTITY_FOUND,
  UNAUTHORIZED_REQUEST,
} from 'src/app/app.constants';
import { RestaurantService } from '../services/restaurant.service';
import { Type } from 'class-transformer';
import {
  CreateRestaurantBodyDto,
  SearchQueryDto,
  getRestaurantByIdDto,
} from '../dto/restaurant.dto';

import {
  CreateRestaurantDishBodyDto,
  UpdateRestaurantDishBodyDto,
  getRestaurantDishByIdDto,
} from '../dto/restaurant.dish.dto';
import { RestaurantDishService } from '../services/restaurant.dish.service';
import { User, UserMetaData } from '../interface';

@ApiBearerAuth('authorization')
@Controller('restaurants')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
)
@ApiTags('restaurant-dish')
export class RestaurantDishController {
  constructor(private readonly service: RestaurantDishService) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('application/json')
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @Post('/:id/dishes')
  public async createRestaurantDish(
    @User() user: UserMetaData,
    @Param() param: getRestaurantByIdDto,
    @Body() payload: CreateRestaurantDishBodyDto,
  ) {
    return await this.service.createRestaurantDish(user, param, payload);
  }

  @HttpCode(HttpStatus.OK)
  @ApiConsumes('application/json')
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @Put('/:id/dishes/:dish_id')
  public async updateRestaurantDish(
    @User() user: UserMetaData,
    @Param() param: getRestaurantDishByIdDto,
    @Body() payload: UpdateRestaurantDishBodyDto,
  ) {
    return await this.service.updateRestaurantDish(user, param, payload);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiConsumes('application/json')
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @Delete('/:id/dishes/:dish_id')
  public async deleteRestaurantDish(
    @User() user: UserMetaData,
    @Param() param: getRestaurantDishByIdDto,
  ) {
    return await this.service.deleteRestaurantDish(user, param);
  }
}
