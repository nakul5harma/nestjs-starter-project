import { Injectable } from '@nestjs/common';

import { get } from 'config';

import { ResponseMessages } from '../shared/constants/response-messages.constants';
import { ResponseModel } from '../shared/models/response.model';

@Injectable()
export class AppService {
  checkServerHealth(): ResponseModel {
    return new ResponseModel(
      `NestJS Starter Project (V${get('version')}) is healthy`,
      ResponseMessages.SUCCESS.code,
      ResponseMessages.SUCCESS.message,
    );
  }
}
