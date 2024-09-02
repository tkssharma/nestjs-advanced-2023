import { SetMetadata } from '@nestjs/common';
import { Roles } from '../roles';

export const RolesAllowed = (...roles: Roles[]) => SetMetadata('roles', roles);
// reflector can access such meta props
