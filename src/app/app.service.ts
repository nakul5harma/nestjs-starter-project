import { Injectable } from '@nestjs/common';

import { get } from 'config';

import { ResponseMessages } from '../shared/constants/response-messages.constants';
import { ResponseModel } from '../shared/models/response.model';

@Injectable()
export class AppService {
  checkServerHealth() {
    return new ResponseModel(
      `I am healthy, running version ${get('version')}`,
      ResponseMessages.SUCCESS.code,
      ResponseMessages.SUCCESS.message,
    );
  }
}
