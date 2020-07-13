import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';

import { agent } from 'supertest';

import { UnhandledExceptionsFilter } from '../src/shared/filters/unhandled-exception.filter';
import { CustomHttpExceptionFilter } from '../src/shared/filters/custom-http-exception.filter';
import { ValidationExceptionFilter } from '../src/shared/filters/validation-exception.filter';
import { ValidationPipe } from '../src/shared/pipes/validation.pipe';
import { AppModule } from '../src/app/app.module';
import { mockHealthCheckAPIResponse } from './test-data/app.e2e-spec.test-data';

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

    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /health', () => {
    it('Should respond when application is running', async (done: any) => {
      const { body } = await agent(app.getHttpServer())
        .get('/health')
        .expect(HttpStatus.OK);

      expect(body).toEqual(mockHealthCheckAPIResponse);

      done();
    });
  });
});
