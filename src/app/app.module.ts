import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmConfig } from '../shared/options/typeorm.options';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [HttpModule, TypeOrmModule.forRoot(typeOrmConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
