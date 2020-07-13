import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomHttpService } from '../shared/services/custom-http.service';
import { typeOrmConfig } from '../shared/options/typeorm.options';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [HttpModule, TypeOrmModule.forRoot(typeOrmConfig)],
  controllers: [AppController],
  providers: [AppService, CustomHttpService],
})
export class AppModule {}
