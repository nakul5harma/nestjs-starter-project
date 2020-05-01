import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';

import * as supertest from 'supertest';

import { UnhandledExceptionsFilter } from '../src/shared/filters/unhandled-exception.filter';
import { CustomHttpExceptionFilter } from '../src/shared/filters/custom-http-exception.filter';
import { ValidationExceptionFilter } from '../src/shared/filters/validation-exception.filter';
import { AppModule } from '../src/app/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalFilters(
      new UnhandledExceptionsFilter(),
      new CustomHttpExceptionFilter(),
      new ValidationExceptionFilter(),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /healthCheck', () => {
    it('Should send application name in response when application is running', async (done: any) => {
      const { text } = await supertest
        .agent(app.getHttpServer())
        .get('/healthCheck')
        .expect(HttpStatus.OK);

      expect(text).toEqual('NestJS Starter Project');

      done();
    });
  });
});
