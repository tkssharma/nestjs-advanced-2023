import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Logger } from '../../logger/logger';

@Controller('/api/v1/health')
export class HealthController {
  constructor(private logger: Logger) {}

  @ApiTags('health')
  @Get()
  public check() {
    this.logger.log('checking health check :: test log message');
    return { msg: 'OK' };
  }
}
