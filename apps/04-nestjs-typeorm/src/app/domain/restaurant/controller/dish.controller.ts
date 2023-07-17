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
  SearchDishQueryDto,
} from '../dto/restaurant.dish.dto';
import { RestaurantDishService } from '../services/restaurant.dish.service';

@ApiBearerAuth('authorization')
@Controller('dishes')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
)
@ApiTags('dish-menu')
export class DishController {
  constructor(private readonly service: RestaurantDishService) {}

  @HttpCode(HttpStatus.OK)
  @ApiConsumes('application/json')
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  // @UseGuards(FirebaseAuthGuard)
  @Get('/')
  public async listRestaurantDish(@Query() query: SearchDishQueryDto) {
    return await this.service.listRestaurantDish(query);
  }
}
