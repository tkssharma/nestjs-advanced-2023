import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { UsersEntity } from './user.entity';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CrateUserResponseDto, CreateUserDto, UserQueryDto } from './user.dto';
import { AuthGuard } from 'src/app/core/guard/api-guard';
import { RoleAllowed } from 'src/app/core/decorator/role-allowed';
import { User } from 'src/app/core/decorator/user';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth('authorization')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  //@RoleAllowed('admin', 'user')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: [CrateUserResponseDto],
    description: 'user fetched successfully',
  })
  @ApiOperation({ description: 'user fetch api ' })
  @ApiConsumes('application/json')
  @Get()
  async findAll(
    @User() user: any,
    @Query() query: UserQueryDto,
  ): Promise<UsersEntity[]> {
    return await this.userService.fetchUsers(query);
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: CrateUserResponseDto,
    description: 'user created successfully',
  })
  @ApiOperation({ description: 'user create api ' })
  @ApiConsumes('application/json')
  @Post()
  async create(@Body() body: CreateUserDto): Promise<UsersEntity> {
    return await this.userService.createUser(body);
  }
}

/*

https"//localhost/api/v1/user?email=hello@gmail.com&ids=1,2,3,4,5,6,7
*/
