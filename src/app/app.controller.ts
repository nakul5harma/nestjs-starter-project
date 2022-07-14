import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { HealthCheckResponseModel } from './models/health-check-response.model';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/app/health')
  checkServerHealth(): HealthCheckResponseModel {
    return this.appService.checkServerHealth();
  }

  @HttpCode(HttpStatus.OK)
  @Get('/app/deephealth')
  checkServerDeepHealth(): HealthCheckResponseModel {
    return this.appService.checkServerHealth();
  }
}
