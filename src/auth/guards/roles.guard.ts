import { Reflector } from '@nestjs/core';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { ForbiddenException } from '../../common/exceptions/forbidden.exception';
import { AuthService } from '../auth.service';
import { UserRoleType } from '../enums/user-role-type.enum';
import { UserProfileModel } from '../models/user-profile.model';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logNameSpace = `Guard.${RolesGuard.name}`;

  constructor(private readonly reflector: Reflector, private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const validRoleTypes: UserRoleType[] = this.reflector.get<UserRoleType[]>(
      'validRoleTypes',
      context.getHandler(),
    );

    if (!validRoleTypes) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userProfile: UserProfileModel = JSON.parse(
      request.headers['x-consumer-profile'] as string,
    );
    const isUserAllowedToPerformAction = this.authService.isUserAllowedToPerformAction(
      validRoleTypes,
      userProfile,
    );

    if (!isUserAllowedToPerformAction) {
      throw new ForbiddenException(`${this.logNameSpace}.unauthorizedAccess`);
    }

    return true;
  }
}
