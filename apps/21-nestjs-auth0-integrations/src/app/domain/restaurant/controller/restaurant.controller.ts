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
import { INTERNAL_SERVER_ERROR, NO_ENTITY_FOUND } from '../../../app.constants';
import { RestaurantService } from '../services/restaurant.service';
import { Type } from 'class-transformer';
import {
  CreateRestaurantBodyDto,
  SearchQueryDto,
  getRestaurantByIdDto,
} from '../dto/restaurant.dto';
import { User, UserMetaData } from '../interface';
import { RolesAllowed } from '../../../core/decorator/role.decorator';
import { Roles } from '../../../core/roles';
import { RolesGuard } from '../../../core/guard/role.guard';

@ApiBearerAuth('authorization')
@Controller('restaurants')
@UseGuards(RolesGuard)
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
)
@ApiTags('restaurant')
export class RestaurantController {
  constructor(private readonly service: RestaurantService) {}

  @UseGuards(RolesGuard)
  // add all roles which we want to allow
  @RolesAllowed(Roles['admin'])
  @HttpCode(HttpStatus.OK)
  @ApiConsumes('application/json')
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: 'UNAUTHORIZED_REQUEST' })
  @ApiUnprocessableEntityResponse({ description: 'BAD_REQUEST' })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @ApiOperation({
    description: 'search restaurants based on lat/lon',
  })
  @ApiOkResponse({
    description: 'return search restaurants successfully',
  })
  @Get('/search')
  public async searchRestaurant(@Query() query: SearchQueryDto) {
    return await this.service.search(query);
  }

  @UseGuards(RolesGuard)
  // add all roles which we want to allow
  @RolesAllowed(Roles['admin'])
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('application/json')
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: 'UNAUTHORIZED_REQUEST' })
  @ApiUnprocessableEntityResponse({ description: 'BAD_REQUEST' })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @ApiOperation({
    description: 'search restaurants based on lat/lon',
  })
  @ApiOkResponse({
    description: 'return search restaurants successfully',
  })
  @Post('/')
  public async createRestaurant(@Body() payload: CreateRestaurantBodyDto) {
    return await this.service.createRestaurant(payload);
  }

  @UseGuards(RolesGuard)
  // add all roles which we want to allow
  @RolesAllowed(Roles['admin'])
  @HttpCode(HttpStatus.OK)
  @ApiConsumes('application/json')
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: 'UNAUTHORIZED_REQUEST' })
  @ApiUnprocessableEntityResponse({ description: 'BAD_REQUEST' })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @ApiOperation({
    description: 'search restaurants based on lat/lon',
  })
  @ApiOkResponse({
    description: 'return search restaurants successfully',
  })
  @Get('/')
  public async getRestaurants(@User() user: UserMetaData) {
    return await this.service.getAllMyRestaurants(user);
  }

  @UseGuards(RolesGuard)
  // add all roles which we want to allow
  @RolesAllowed(Roles['admin'])
  @HttpCode(HttpStatus.OK)
  @ApiConsumes('application/json')
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: 'UNAUTHORIZED_REQUEST' })
  @ApiUnprocessableEntityResponse({ description: 'BAD_REQUEST' })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @ApiOperation({
    description: 'search restaurants based on lat/lon',
  })
  @ApiOkResponse({
    description: 'return search restaurants successfully',
  })
  @Get('/:id')
  public async getRestaurantById(@Param() param: getRestaurantByIdDto) {
    return await this.service.getRestaurantById(param);
  }
}
