import { Controller, Get, Param, Query } from '@nestjs/common';
import { GithubUser } from './user';
import { Observable } from 'rxjs';
import { GithubService } from './github.service';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get('users/:user')
  // path param
  //users/tkssharma
  getUser(@Param('user') username: string): Observable<GithubUser> {
    return this.githubService.getUser(username);
  }

  @Get('users')
  // query param
  getAllUser(@Query('users') users: string): Observable<GithubUser[]> {
    return this.githubService.getUsers(users);
  }
}
