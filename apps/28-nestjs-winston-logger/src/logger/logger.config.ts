import * as winston from 'winston';
import 'winston-daily-rotate-file';

const transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.colorize(),
      winston.format.printf(({ timestamp, level, message, context, trace }) => {
        return `${timestamp} [${context}] ${level}: ${message}${
          trace ? `\n${trace}` : ''
        }`;
      }),
    ),
  }),
  // add any other transport  like
  // save logs tp ELK
  // save logs to mongodb
  // send logs to slack/teams web hook
  new winston.transports.DailyRotateFile({
    filename: 'logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp(), // Add a timestamp to file logs
      winston.format.json(),
    ),
  }),
];
export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports,
});
