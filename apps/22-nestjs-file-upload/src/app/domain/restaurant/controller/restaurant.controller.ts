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
  UploadedFiles,
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
import { RolesAllowed } from '../../../core/decorator/role.decorator';
import { Roles } from '../../../core/roles';
import { RolesGuard } from '../../../core/guard/role.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  uploadFile,
  uploadFiles,
} from '../../../core/decorator/file.decorator';
import { imageFileFilter } from '../../../core/filters/file.filter';
import { GetCurrentUser, User, UserData, UserMetaData } from '../interface';

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
  public async createRestaurant(
    @GetCurrentUser() user: any,
    @UserData('email') email: string,
    @Body() payload: CreateRestaurantBodyDto,
  ) {
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

  // multiple file upload
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

  // multiple file upload
  @UseGuards(RolesGuard)
  // add all roles which we want to allow
  @RolesAllowed(Roles['admin'])
  // one file upload
  @Post('one-file')
  // custom decorator
  // ONE FILE UPLOAD ONLY
  @uploadFile('file')
  @ApiForbiddenResponse({ description: 'UNAUTHORIZED_REQUEST' })
  @ApiUnprocessableEntityResponse({ description: 'BAD_REQUEST' })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  public async uploadFileOne(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /(jpg|png)$/ })
        .addMaxSizeValidator({ maxSize: SIZE })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    try {
      return file;
    } catch (err) {
      throw err;
    }
  }

  // multiple file upload
  @UseGuards(RolesGuard)
  // add all roles which we want to allow
  // upload many files together P
  @RolesAllowed(Roles['admin'])
  @Post('many-files')
  // custom decorator
  @uploadFiles('file')
  @ApiForbiddenResponse({ description: 'UNAUTHORIZED_REQUEST' })
  @ApiUnprocessableEntityResponse({ description: 'BAD_REQUEST' })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @UseInterceptors(FilesInterceptor('file'))
  // all plural here
  // validation with many files
  @ApiConsumes('multipart/form-data')
  public async uploadFiles(
    @UploadedFiles(
      // it will validate each and every files
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /(jpg|png)$/ })
        .addMaxSizeValidator({ maxSize: SIZE })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    files: Array<Express.Multer.File>,
  ) {
    try {
      // once we have files lets upload them in a Loop
      console.log(files);
      return await this.service.upload(files);
    } catch (err) {
      throw err;
    }
  }

  // multiple file upload
  @UseGuards(RolesGuard)
  // add all roles which we want to allow
  @RolesAllowed(Roles['admin'])
  @Post('custom-validation')
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
    console.log(file);
    if (!file || req.fileValidationError) {
      throw new BadRequestException(
        'invalid file provided, allowed *.pdf single file for Invoice',
      );
    }
    return file;
  }
}
