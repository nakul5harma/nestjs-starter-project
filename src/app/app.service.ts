import { Injectable } from '@nestjs/common';

import { HealthCheckResponseModel } from './models/health-check-response.model';

@Injectable()
export class AppService {
  checkServerHealth(): HealthCheckResponseModel {
    return {
      status: 'OK',
    };
  }
}
