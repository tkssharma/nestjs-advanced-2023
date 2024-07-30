import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';

import { User } from '@prisma/client';
import { EditUserDto } from './dto';
import { UserService } from './user.service';
import { AtGuard } from '../auth/guard';
import { GetCurrentUser, GetCurrentUserId } from '../auth/decorator';
import { ConfigId } from '../types';

@UseGuards(AtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@GetCurrentUser() user: User) {
    return user;
  }

  @Patch()
  editUser(@GetCurrentUserId() userId: ConfigId, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
