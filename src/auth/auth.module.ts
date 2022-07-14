import { Module } from '@nestjs/common';

import { RolesGuard } from './guards/roles.guard';
import { AuthService } from './auth.service';

@Module({
  providers: [RolesGuard, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
