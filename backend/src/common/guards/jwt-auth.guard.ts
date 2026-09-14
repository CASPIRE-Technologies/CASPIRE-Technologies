// jwt-auth.guard.ts
import { type CanActivate, type ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { type Request } from 'express';
import JWT, { type JwtPayload } from '../../common/jwt/jwt.js';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies?.accessToken; // adjust cookie name to your setup

    if (!token) {
      throw new UnauthorizedException('No access token provided');
    }

    const payload = JWT.verifyAccess<JwtPayload>(token);
    if (!payload) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    // attach user to request for downstream use
    (request as any).user = payload;
    return true;
  }
}