// auth.service.ts
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { PrismaService } from '../../prisma/prisma.service.js';
import { RegisterDto, LoginDto } from './dto/auth.dto.js';
import JWT, { type JwtPayload, Role } from '../../common/jwt/jwt.js';
import type { RoleType } from '../../generated/prisma/enums.js';

const REFRESH_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {
    
    // Diagnostic: confirm service instantiation and availability of Prisma
    // eslint-disable-next-line no-console
    console.log('AuthService constructed — prisma injected?', !!this.prisma);
  }

  async register(dto: RegisterDto, ipAddress?: string, userAgent?: string) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) {
      throw new ConflictException('Email is already in use');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash: hashedPassword,
        name: dto.full_name,
        role: Role.USER as RoleType, // always default — never trust a client-supplied role
      },
    });

    return this.issueTokens(user, ipAddress, userAgent);
  }

  async login(dto: LoginDto, ipAddress?: string, userAgent?: string) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.issueTokens(user, ipAddress, userAgent);
  }

  async refreshToken(rawToken: string | undefined) {
    if (!rawToken) {
      throw new UnauthorizedException('No refresh token provided');
    }

    const payload = JWT.verifyRefresh<JwtPayload>(rawToken);
    if (!payload) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const tokenHash = this.hashToken(rawToken);
    const stored = await this.prisma.refreshToken.findFirst({ where: { token: tokenHash } });

    if (!stored || stored.revoked || stored.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token is no longer valid');
    }

    // rotate: revoke the used token, issue a fresh pair
    await this.prisma.refreshToken.update({
      where: { token: tokenHash },
      data: { revoked: true },
    });

    const newPayload: JwtPayload = { sub: payload.sub, email: payload.email, role: payload.role };
    const accessToken = JWT.signAccess(newPayload);
    const refreshToken = JWT.signRefresh(newPayload);

    await this.prisma.refreshToken.create({
      data: {
        token: this.hashToken(refreshToken),
        userId: payload.sub,
        expiresAt: new Date(Date.now() + REFRESH_TTL_MS),
      },
    });

    return { accessToken, refreshToken };
  }

  async logout(userId: string, refreshToken?: string) {
    if (refreshToken) {
      // revoke just this session
      const tokenHash = this.hashToken(refreshToken);
      await this.prisma.refreshToken.updateMany({
        where: { tokenHash, userId },
        data: { revoked: true },
      });
    } else {
      // no token provided → revoke every session for this user
      await this.prisma.refreshToken.updateMany({
        where: { userId, revoked: false },
        data: { revoked: true },
      });
    }

    return { message: 'Logged out successfully' };
  }

  private async issueTokens(
    user: { id: string; email: string; role: string },
    ipAddress?: string,
    userAgent?: string,
  ) {
    const payload: JwtPayload = { sub: user.id, email: user.email, role: user.role as Role };
    const accessToken = JWT.signAccess(payload);
    const refreshToken = JWT.signRefresh(payload);

    await this.prisma.refreshToken.create({
      data: {
        token: this.hashToken(refreshToken),
        userId: user.id,
        ipAddress,
        userAgent,
        expiresAt: new Date(Date.now() + REFRESH_TTL_MS),
      },
    });

    return {
      accessToken,
      refreshToken,
      user: { id: user.id, email: user.email, role: user.role },
    };
  }

  private hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }
}