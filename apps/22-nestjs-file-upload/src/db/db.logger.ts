import { Injectable } from '@nestjs/common';
import { Logger as TypeORMLogger } from 'typeorm';
import { Logger } from '../logger/logger';

/**
 * Provides a wrapper around the logger for TypeORM.
 */
@Injectable()
export class DbLogger implements TypeORMLogger {
  constructor(private logger: Logger) {}

  private stringifyQuery(query: string, parameters?: any[]) {
    const parametersStr = parameters ? ` (${JSON.stringify(parameters)})` : '';
    return `${query}${parametersStr}`;
  }

  public logQuery(query: string, parameters?: any[]): void {
    this.logger.debug(`DB: ${this.stringifyQuery(query, parameters)}`);
  }
  public logQueryError(error: string, query: string, parameters?: any[]) {
    this.logger.error(
      `DB: ${error} - ${this.stringifyQuery(query, parameters)}`,
    );
  }
  public logQuerySlow(time: number, query: string, parameters?: any[]) {
    this.logger.warn(
      `DB: SLOW (${time}) - ${this.stringifyQuery(query, parameters)}`,
    );
  }
  public logSchemaBuild(message: string) {
    this.logger.info(`DB: ${message}`);
  }
  public logMigration(message: string) {
    this.logger.info(`DB: ${message}`);
  }
  public log(level: 'log' | 'info' | 'warn', message: any) {
    switch (level) {
      case 'log':
      case 'info':
        this.logger.info(`${message}`);
        break;
      case 'warn':
        this.logger.warn(`${message}`);
        break;
      default:
        this.logger.debug(`${message}`);
        break;
    }
  }
}
