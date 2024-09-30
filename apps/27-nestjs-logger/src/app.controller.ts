import { Controller, Get, Logger } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import debug from 'debug';

const verbose = debug('api:verbose:AppController');
const error = debug('api:error:AppController');

@Controller('/health')
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(
    private readonly health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ) {}

  @ApiOkResponse({ description: 'returns the health check ' })
  @ApiTags('health')
  @Get()
  @HealthCheck()
  getHello() {
    const tag = 'getHello -> AppController';
    // verbose(`${tag} controller method: %j`, 'healthCheck');
    this.logger.log('Doing HealthCheck...');
    return this.health.check([async () => this.db.pingCheck('typeorm')]);
  }
}
