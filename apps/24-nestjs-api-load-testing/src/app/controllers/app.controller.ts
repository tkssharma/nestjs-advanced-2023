import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('/health')
export class HealthController {
  constructor() {}

  @ApiTags('health')
  @Get()
  public check() {
    console.log('ok');
    return { msg: 'OK' };
  }
}
