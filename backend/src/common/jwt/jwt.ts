import { JwtService } from '@nestjs/jwt';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export interface JwtPayload {
  sub: string;      // user id
  email: string;
  role: Role;
}

export default class JWT {
  static readonly secret = process.env.JWT_SECRET || 'apex-secret-key-super-secure-change-in-prod';
  static readonly refreshSecret = process.env.JWT_REFRESH_SECRET || 'apex-refresh-secret-key-change-in-prod';

  private static svc = new JwtService({});

  static signAccess(payload: JwtPayload, expiresIn = '15m') {
    // BUG FIX: was `(payload, {...})` — comma operator dropped `payload`
    return this.svc.sign(payload, { secret: this.secret, expiresIn });
  }

  static signRefresh(payload: JwtPayload, expiresIn = '7d') {
    return this.svc.sign(payload, { secret: this.refreshSecret, expiresIn });
  }

  static verifyAccess<T = JwtPayload>(token: string): T | null {
    try {
      return this.svc.verify(token, { secret: this.secret }) as T;
    } catch {
      return null;
    }
  }

  static verifyRefresh<T = JwtPayload>(token: string): T | null {
    try {
      return this.svc.verify(token, { secret: this.refreshSecret }) as T;
    } catch {
      return null;
    }
  }

  static decode<T = JwtPayload>(token: string): T | null {
    try {
      return this.svc.decode(token) as T;
    } catch {
      return null;
    }
  }
}