import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // what if this service is getting data from DB
  getHello(): string {
    return 'Hello World!';
  }
  getHelloFromDB(): string {
    return 'Hello World!';
  }
}
