import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule } from '../common/common.module';
import { AuthModule } from '../auth/auth.module';
import { typeOrmConfig } from '../database/options/typeorm.options';
import { TestModule } from '../test/test.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), CommonModule, TestModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
