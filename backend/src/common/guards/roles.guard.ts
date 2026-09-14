// roles.guard.ts
import { type CanActivate, type ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { type Request } from 'express';
import { ROLES_KEY } from '../decorators/roles.decorator.js';
import { Role, type JwtPayload } from '../../common/jwt/jwt.js';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // no @Roles() decorator → route is open to any authenticated user
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = (request as any).user as JwtPayload;

    if (!user) {
      throw new ForbiddenException('No user context found — is JwtAuthGuard applied first?');
    }

    const hasRole = requiredRoles.includes(user.role);
    if (!hasRole) {
      throw new ForbiddenException(`Requires one of roles: ${requiredRoles.join(', ')}`);
    }

    return true;
  }
}