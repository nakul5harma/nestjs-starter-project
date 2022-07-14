import { Injectable } from '@nestjs/common';

import { get } from '../../config';
import { UserRolesConfig } from '../common/models/configs/user-roles.config';
import { UserRoleType } from './enums/user-role-type.enum';
import { UserRoleModel, UserProfileModel } from './models/user-profile.model';

@Injectable()
export class AuthService {
  private getRoleNamesForRoleType(roleType: UserRoleType): string[] {
    const userRolesConfig = get<UserRolesConfig>('userRoles');

    return userRolesConfig[roleType] || [];
  }

  private doesUserHaveValidRoleForRoleType(
    roleType: UserRoleType,
    userRoles: UserRoleModel[],
  ): boolean {
    const validRoles: string[] = this.getRoleNamesForRoleType(roleType);
    const userRoleNames = userRoles.map((userRole: UserRoleModel) => userRole.name);

    return userRoleNames.some((role: string) => validRoles.includes(role));
  }

  private doesUserHaveRoleAccess(roleType: UserRoleType, userProfile: UserProfileModel): boolean {
    switch (roleType) {
      default:
        return this.doesUserHaveValidRoleForRoleType(roleType, userProfile.roles);
    }
  }

  public isUserAllowedToPerformAction(
    validRoleTypes: UserRoleType[],
    userProfile: UserProfileModel,
  ): boolean {
    return validRoleTypes.some((role: UserRoleType) =>
      this.doesUserHaveRoleAccess(role, userProfile),
    );
  }

  public validateUserRole(validRoles: UserRoleType[], userCurrentRoles: UserRoleModel[]): boolean {
    return validRoles.some((role: UserRoleType) =>
      this.doesUserHaveValidRoleForRoleType(role, userCurrentRoles),
    );
  }
}
