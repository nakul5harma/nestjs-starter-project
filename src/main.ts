import { NestFactory } from '@nestjs/core';

import 'reflect-metadata';
import * as config from 'config';

import { LoggerService } from './shared/logger/logger.service';
import { ValidationExceptionFilter } from './shared/filters/validation-exception.filter';
import { CustomHttpExceptionFilter } from './shared/filters/custom-http-exception.filter';
import { UnhandledExceptionsFilter } from './shared/filters/unhandled-exception.filter';
import { ValidationPipe } from './shared/pipes/validation.pipe';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const serverConfig = config.get('server');
  const appPort = process.env.PORT || serverConfig.port;

  const app = await NestFactory.create(AppModule, {
    logger: LoggerService.getLoggerServiceInstance(),
  });

  app.useGlobalFilters(
    new UnhandledExceptionsFilter(),
    new CustomHttpExceptionFilter(),
    new ValidationExceptionFilter(),
  );

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(appPort);
}
bootstrap();
