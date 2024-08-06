import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Logger } from '../../../logger/logger';
import { RequestLog } from '../../../logger/logger.middleware';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}
  public catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest<RequestLog>();
    this.logger.error(exception);
    const message =
      exception instanceof BadRequestException
        ? (exception.getResponse() as any)?.message
        : exception.message;

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    response.status(status).json({
      status,
      coorelationId: request.correlationId,
      message,
    });
  }
}
