import { Controller, Get } from '@nestjs/common';

@Controller('/api/v1')
export class AppController {
  @Get('/testAuth0')
  getHello() {
    return {
      status: 'ok',
    };
  }

  @Get('/health')
  getHealthCheck() {
    return {
      status: 'ok',
    };
  }
}
