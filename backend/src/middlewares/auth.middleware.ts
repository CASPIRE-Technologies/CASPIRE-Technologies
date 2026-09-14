// common/middleware/auth.middleware.ts
import { Injectable, type NestMiddleware, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';
import JWT, { type JwtPayload, Role } from '../common/jwt/jwt.js';

// map path prefixes to the roles allowed to access them
const ROUTE_ROLES: { prefix: string; roles: Role[] }[] = [
  { prefix: '/v1/admin', roles: [Role.ADMIN, Role.SUPER_ADMIN] },
  { prefix: '/v1/super', roles: [Role.SUPER_ADMIN] },
  // anything not matched here just requires a valid token, no role restriction
];

// paths that should skip auth entirely
const PUBLIC_PATHS = ['/v1/auth/login', '/v1/auth/register', '/v1/auth/refresh'];

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (PUBLIC_PATHS.some((path) => req.path.startsWith(path))) {
      return next();
    }

    const token = this.extractToken(req);
    if (!token) {
      throw new UnauthorizedException('No access token provided');
    }

    const payload = JWT.verifyAccess<JwtPayload>(token);
    if (!payload) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    const matchedRule = ROUTE_ROLES.find((rule) => req.path.startsWith(rule.prefix));
    if (matchedRule && !matchedRule.roles.includes(payload.role)) {
      throw new ForbiddenException(`Requires one of roles: ${matchedRule.roles.join(', ')}`);
    }

    (req as any).user = payload;
    next();
  }

  private extractToken(req: Request): string | undefined {
    const cookieToken = req.cookies?.accessToken;
    if (cookieToken) return cookieToken;

    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      return authHeader.slice(7);
    }

    return undefined;
  }
}