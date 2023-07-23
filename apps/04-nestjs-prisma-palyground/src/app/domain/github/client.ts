import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Observable, catchError, filter, map, tap, throwError } from 'rxjs';
import { GithubUser } from './user';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse, AxiosError } from 'axios';

@Injectable()
export class GithubClient {
  constructor(private readonly httpService: HttpService) {}
  private readonly GITHUB_API: string = 'https://api.github.com';

  getUser(username: string): Observable<AxiosResponse<GithubUser, any>> {
    return this.httpService
      .get<GithubUser>(`${this.GITHUB_API}/users/${username}`)
      .pipe(
        map((response) => response),
        catchError((error: AxiosError) => {
          console.log('An error occurred:', error);
          const { response } = error;
          return throwError(
            new InternalServerErrorException('error occurred..'),
          );
        }),
      );
  }
}
