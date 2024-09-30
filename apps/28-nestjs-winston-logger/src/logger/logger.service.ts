import { Injectable } from '@nestjs/common';
import { logger } from './logger.config';

@Injectable()
export class AppLoggerService {
  log(message: string, context?: string) {
    logger.info(message, { context });
  }
  error(message: string, trace: string, context?: string) {
    logger.error(message, { context, trace });
  }

  warn(message: string, context?: string) {
    logger.warn(message, { context });
  }

  debug(message: string, context?: string) {
    logger.debug(message, { context });
  }
}
