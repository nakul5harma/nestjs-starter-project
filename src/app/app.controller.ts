import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { ResponseModel } from '../shared/models/response.model';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/health')
  checkServerHealth(): ResponseModel {
    return this.appService.checkServerHealth();
  }
}
