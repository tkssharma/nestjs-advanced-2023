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
} from "@nestjs/common";
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
} from "@nestjs/swagger";
import { Logger } from "@dev/logger";
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NO_ENTITY_FOUND,
  UNAUTHORIZED_REQUEST,
} from "src/app/app.constants";
import { RestaurantService } from "../services/restaurant.service";
import { Type } from "class-transformer";
import {
  CreateRestaurantBodyDto,
  SearchQueryDto,
  getRestaurantByIdDto,
} from "../dto/restaurant.dto";
import {
  CheckAuthorization,
  FirebaseAuthGuard,
  User,
  UserMetaData,
} from "@dev/auth";

@ApiBearerAuth("authorization")
@Controller("restaurants")
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  })
)
@ApiTags("restaurant")
export class RestaurantController {
  constructor(
    private readonly service: RestaurantService,
    private readonly logger: Logger
  ) {}

  @HttpCode(HttpStatus.OK)
  @ApiConsumes("application/json")
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @ApiOperation({
    description: "search restaurants based on lat/lon",
  })
  @ApiOkResponse({
    description: "return search restaurants successfully",
  })
  @Get("/search")
  public async searchRestaurant(@Query() query: SearchQueryDto) {
    return await this.service.search(query);
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes("application/json")
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @ApiOperation({
    description: "search restaurants based on lat/lon",
  })
  @ApiOkResponse({
    description: "return search restaurants successfully",
  })
  @UseGuards(FirebaseAuthGuard)
  @Post("/")
  public async createRestaurant(
    @User() user: UserMetaData,
    @Body() payload: CreateRestaurantBodyDto
  ) {
    console.log(user);
    return await this.service.createRestaurant(user, payload);
  }

  @HttpCode(HttpStatus.OK)
  @ApiConsumes("application/json")
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @ApiOperation({
    description: "search restaurants based on lat/lon",
  })
  @ApiOkResponse({
    description: "return search restaurants successfully",
  })
  @UseGuards(FirebaseAuthGuard)
  @Get("/")
  public async getRestaurants(@User() user: UserMetaData) {
    console.log(user);
    return await this.service.getAllMyRestaurants(user);
  }

  @HttpCode(HttpStatus.OK)
  @ApiConsumes("application/json")
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @ApiOperation({
    description: "search restaurants based on lat/lon",
  })
  @ApiOkResponse({
    description: "return search restaurants successfully",
  })
  @Get("/:id")
  public async getRestaurantById(@Param() param: getRestaurantByIdDto) {
    return await this.service.getRestaurantById(param);
  }
}
