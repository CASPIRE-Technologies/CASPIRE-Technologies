// current-user.decorator.ts
import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import { type JwtPayload } from '../../common/jwt/jwt.js';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);