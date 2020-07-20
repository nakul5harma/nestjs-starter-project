import { Controller } from '@nestjs/common';

import { Logger } from '../logger/logger';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  private readonly logNameSpace = `Controller.${TestController.name}`;
  private readonly logger = Logger.getInstance();

  constructor(private readonly testService: TestService) {}
}
