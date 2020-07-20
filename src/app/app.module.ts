import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomHttpService } from '../shared/services/custom-http.service';
import { typeOrmConfig } from '../database/options/typeorm.options';
import { TestModule } from '../test/test.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [HttpModule, TypeOrmModule.forRoot(typeOrmConfig), TestModule],
  controllers: [AppController],
  providers: [AppService, CustomHttpService],
})
export class AppModule {}
