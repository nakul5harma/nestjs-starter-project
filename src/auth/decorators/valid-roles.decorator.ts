import { SetMetadata, UseGuards } from '@nestjs/common';

import { RolesGuard } from '../guards/roles.guard';
import { UserRoleType } from '../enums/user-role-type.enum';

export const ValidRoles = (...roleTypes: UserRoleType[]) => {
  const setMetadata = SetMetadata('validRoleTypes', roleTypes);
  const setupGuard = UseGuards(RolesGuard);

  return (target: any, key?: string, descriptor?: any) => {
    setMetadata(target, key, descriptor);
    setupGuard(target, key, descriptor);
  };
};
