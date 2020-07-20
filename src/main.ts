import { NestFactory } from '@nestjs/core';
import { RequestMethod } from '@nestjs/common';

import 'reflect-metadata';
import { get } from 'config';

import { ValidationExceptionFilter } from './shared/filters/validation-exception.filter';
import { CustomHttpExceptionFilter } from './shared/filters/custom-http-exception.filter';
import { UnhandledExceptionsFilter } from './shared/filters/unhandled-exception.filter';
import { ValidationPipe } from './shared/pipes/validation.pipe';
import { ENVIRONMENT } from './shared/configs/environment.config';
import { ServerConfig } from './shared/models/config/server.config';
import { RequestLoggingInterceptor } from './logger/interceptors/request-logging.interceptor';
import { Logger } from './logger/logger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const serverConfig: ServerConfig = get<ServerConfig>('server');
  const appPort = process.env.PORT || serverConfig.port;

  const app = await NestFactory.create(AppModule, {
    logger: Logger.getInstance(),
  });

  app.setGlobalPrefix('nestjs-starter');

  app.useGlobalFilters(
    new UnhandledExceptionsFilter(),
    new CustomHttpExceptionFilter(),
    new ValidationExceptionFilter(),
  );

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalInterceptors(
    new RequestLoggingInterceptor({
      excludePaths: [
        {
          path: '/nestjs-starter/health',
          method: RequestMethod.GET,
        },
      ],
    }),
  );

  await app.listen(appPort).then(async () => {
    Logger.getInstance().info(
      'Application',
      `Application is running on: ${await app.getUrl()}`,
      'ENVIRONMENT:',
      ENVIRONMENT,
    );
  });
}
bootstrap();
