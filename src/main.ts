import { NestFactory } from '@nestjs/core';

import 'reflect-metadata';
import rTracer = require('cls-rtracer');
import { json, urlencoded } from 'express';

import { get } from '../config';
import { ValidationExceptionFilter } from './common/filters/validation-exception.filter';
import { CustomExceptionFilter } from './common/filters/custom-exception.filter';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { ENVIRONMENT } from './common/configs/environment.config';
import { ServerConfig } from './common/models/configs/server.config';
import { ApiLoggerMiddleware, Logger } from './logger/logger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const serverConfig: ServerConfig = get<ServerConfig>('server');
  const appPort = serverConfig.port;

  const app = await NestFactory.create(AppModule, {
    logger: Logger,
  });

  app.enableCors();

  app.use(rTracer.expressMiddleware(), ApiLoggerMiddleware);
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  app.useGlobalFilters(new CustomExceptionFilter(), new ValidationExceptionFilter());

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(appPort).then(async () => {
    Logger.info('main', {
      application: `Application is running on: ${await app.getUrl()}`,
      environment: ENVIRONMENT,
    });
  });
}
bootstrap();
