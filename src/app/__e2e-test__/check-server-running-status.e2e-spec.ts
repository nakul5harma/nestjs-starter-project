import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';

import { agent } from 'supertest';

import { CustomExceptionFilter } from '../../common/filters/custom-exception.filter';
import { ValidationExceptionFilter } from '../../common/filters/validation-exception.filter';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { AppModule } from '../app.module';
import { mockHealthCheckAPIResponse } from './test-data/app.e2e-spec.test-data';

describe('Check server running status - GET /app/health', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalFilters(new CustomExceptionFilter(), new ValidationExceptionFilter());

    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should respond when application is running', async () => {
    const { body } = await agent(app.getHttpServer()).get('/app/health').expect(HttpStatus.OK);
    expect(body).toEqual(mockHealthCheckAPIResponse);
  });
});
