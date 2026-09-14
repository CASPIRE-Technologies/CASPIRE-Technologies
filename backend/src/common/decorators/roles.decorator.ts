// roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import type { Role } from '../../common/jwt/jwt.ts';
import type { RoleType } from '../../generated/prisma/enums.js';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[] | RoleType[]) => SetMetadata(ROLES_KEY, roles);