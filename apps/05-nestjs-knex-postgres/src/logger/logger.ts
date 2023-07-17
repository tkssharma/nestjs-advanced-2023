import { Injectable, LoggerService } from '@nestjs/common';
import * as moment from 'moment';
import * as winston from 'winston';

import { ConfigService } from '../config/config.service';
import { isLogLevel, LogLevel } from './loglevel';

const formatter = winston.format((info) => {
  if (info.level === LogLevel.HTTP) {
    // HTTP messages are already formatted by the middleware, so just pass through
    return info;
  }
  if (process.env.NODE_ENV !== 'test') {
    info.message = `[${moment().format('ddd MMM DD HH:mm:ss YYYY')}] [${
      info.level
    }] ${info.message}`;
  }
  return info;
});

/**
 * Provides a means to write log messages.
 */
@Injectable()
export class Logger implements LoggerService {
  public logger: winston.Logger;

  constructor(private configService: ConfigService) {
    this.logger = winston.createLogger({
      level: configService.get().logLevel,
      format: formatter(),
    });
    this.logger.add(
      new winston.transports.Console({
        format: winston.format.json(),
        stderrLevels: [LogLevel.Error, LogLevel.Warn],
      }),
    );
  }

  /**
   * Writes a log message.
   * @param level the severity of the message
   * @param message the log message
   */
  public log(level: LogLevel, message: string): void;
  /**
   * Writes a log message with the {@link LogLevel.Info} log level.
   * @param message the log message
   */
  public log(message: string): void;
  public log(p0: LogLevel | string, p1?: string, meta?: any) {
    const logLevel = isLogLevel(p0) ? p0 : LogLevel.Info;
    const message = isLogLevel(p0) && p1 ? p1 : p0;
    this.logger.log(logLevel, message, meta);
  }

  /**
   * Adds default metadata to every log message.
   * @param correlationId the log message
   */
  public setDefaultMeta(correlationId: string) {
    // this.logger.defaultMeta = { correlationId };
  }
  /**
   * Writes a log message with the {@link LogLevel.Error} log level.
   * @param message the log message
   */
  public error(message: string) {
    this.log(LogLevel.Error, message);
  }

  /**
   * Writes a log message with the {@link LogLevel.Warn} log level.
   * @param message the log message
   */
  public warn(message: string) {
    this.log(LogLevel.Warn, message);
  }

  /**
   * Writes a log message with the {@link LogLevel.Info} log level.
   * @param message the log message
   */
  public info(message: string) {
    this.log(LogLevel.Info, message);
  }

  /**
   * Writes a log message with the {@link LogLevel.HTTP} log level.
   * @param message the log message
   */
  public http(message: string) {
    this.log(LogLevel.HTTP, message);
  }

  /**
   * Writes a log message with the {@link LogLevel.Verbose} log level.
   * @param message the log message
   */
  public verbose(message: string) {
    this.log(LogLevel.Verbose, message);
  }

  /**
   * Writes a log message with the {@link LogLevel.Debug} log level.
   * @param message the log message
   */
  public debug(message: string) {
    this.log(LogLevel.Debug, message);
  }

  /**
   * Writes a log message with the {@link LogLevel.Silly} log level.
   * @param message the log message
   */
  public silly(message: string) {
    this.log(LogLevel.Silly, message);
  }
}
