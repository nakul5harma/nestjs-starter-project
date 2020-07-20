import { get } from 'config';

import { ResponseMessages } from '../../src/shared/constants/response-messages.constants';

export const mockHealthCheckAPIResponse = {
  data: `NestJS Starter Project (V${get('version')}) is healthy`,
  code: ResponseMessages.SUCCESS.code,
  message: ResponseMessages.SUCCESS.message,
};
