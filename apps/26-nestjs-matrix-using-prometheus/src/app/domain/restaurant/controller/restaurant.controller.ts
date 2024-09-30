// Native.
/* eslint-disable no-useless-escape */

// Package.
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
  ParseFilePipeBuilder,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Req,
  BadRequestException,
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
import { RolesAllowed } from '@core/decorator/role.decorator';
import { Roles } from '@core/roles';
import { RolesGuard } from '@core/guard/role.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadFile } from '@core/decorator/file.decorator';
import { imageFileFilter } from '@core/filters/file.filter';

import { GetCurrentUser, UserData, UserMetaData } from '../interface';

const SIZE = 2 * 1024 * 1024;
const VALID_UPLOADS_MIME_TYPES = ['image/jpeg', 'image/png'];

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
  public async createRestaurant(
    @UserData('email') email: string,
    @Body() payload: CreateRestaurantBodyDto,
  ) {
    // return await this.service.createRestaurant(payload);
  }

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
  public async getRestaurants(@UserData() user: UserMetaData) {
    return await this.service.getAllMyRestaurants(user);
  }

  // add all roles which we want to allow
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

  @Post('upload')
  // custom decorator
  @uploadFile('file')
  @ApiForbiddenResponse({ description: 'UNAUTHORIZED_REQUEST' })
  @ApiUnprocessableEntityResponse({ description: 'BAD_REQUEST' })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  public async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /(jpg)$/ })
        .addMaxSizeValidator({ maxSize: SIZE })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file,
  ) {
    return file;
  }

  @Post('uploadv2')
  // custom decorator
  @uploadFile('file')
  @ApiForbiddenResponse({ description: 'UNAUTHORIZED_REQUEST' })
  @ApiUnprocessableEntityResponse({ description: 'BAD_REQUEST' })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: imageFileFilter,
    }),
  )
  @ApiConsumes('multipart/form-data')
  public async uploadFilev2(@Req() req: any, @UploadedFile() file) {
    if (!file || req.fileValidationError) {
      throw new BadRequestException(
        'invalid file provided, allowed *.pdf single file for Invoice',
      );
    }
    return file;
  }
}
function User(): (
  target: RestaurantController,
  propertyKey: 'getRestaurants',
  parameterIndex: 0,
) => void {
  throw new Error('Function not implemented.');
}
