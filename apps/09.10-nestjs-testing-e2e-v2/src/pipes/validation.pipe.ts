import { BadRequestException, ValidationPipe } from '@nestjs/common';

export function setupGlobalPipes(app: {
  useGlobalPipes: (arg0: ValidationPipe) => void;
}) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      enableDebugMessages: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.reduce((accumulator, error) => {
          accumulator[error.property] = Object.values(error.constraints).join(
            ', ',
          );
          return accumulator;
        }, {});

        throw new BadRequestException(formattedErrors);
      },
    }),
  );
}
