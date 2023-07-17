import { SetMetadata } from '@nestjs/common';

export const RoleAllowed = (...roles: string[]) => SetMetadata('roles', roles);
