import { Controller, Post, Body, Req, Res, UseGuards, HttpCode, HttpStatus, Get, ConflictException, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { type Request, type Response } from 'express';
import { PrismaService } from '../../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import JWT, { type JwtPayload, Role } from '../../common/jwt/jwt.js';
import { RegisterDto, LoginDto } from './dto/auth.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import type { RoleType } from '../../generated/prisma/enums.js';

const ACCESS_COOKIE = 'accessToken';
const REFRESH_COOKIE = 'refreshToken';

const cookieOptions = (maxAgeMs: number) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // requires HTTPS in prod
  sameSite: 'strict' as const,
  maxAge: maxAgeMs,
  path: '/',
});

const setAuthCookies = (res: Response, accessToken: string, refreshToken: string) => {
  res.cookie(ACCESS_COOKIE, accessToken, cookieOptions(15 * 60 * 1000));         // 15m
  res.cookie(REFRESH_COOKIE, refreshToken, cookieOptions(7 * 24 * 60 * 60 * 1000)); // 7d
};

@ApiTags('Authentication')
@Controller('v1/auth')
export class AuthController {
  constructor(private prisma: PrismaService) {
    this.prisma = new PrismaService();
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user account' })
  @ApiResponse({ status: 201, description: 'Registration successful, sets JWT cookies' })
  @ApiResponse({ status: 409, description: 'Email already in use' })
  async register(
    @Body() registerDto: RegisterDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    // ipAddress and userAgent intentionally not persisted (not present in schema)

    const existing = await this.prisma.user.findUnique({ where: { email: registerDto.email.toLowerCase() } });
    if (existing) {
      throw new ConflictException('Email is already in use');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: registerDto.email.toLowerCase(),
        passwordHash: hashedPassword,
        name: registerDto.full_name,
        role: Role.USER,
      },
    });

    // issue tokens
    const payload: JwtPayload = { sub: user.id, email: user.email, role: user.role as Role };
    const accessToken = JWT.signAccess(payload);
    const refreshToken = JWT.signRefresh(payload);

    await this.prisma.refreshToken.create({
      data: {
        token: crypto.createHash('sha256').update(refreshToken).digest('hex'),
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    setAuthCookies(res, accessToken, refreshToken);
    return { user: { id: user.id, email: user.email, role: user.role } };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiResponse({ status: 200, description: 'Login successful, sets JWT cookies' })
  @ApiResponse({ status: 401, description: 'Invalid email or password' })
  async login(
    @Body() loginDto: LoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    // ipAddress and userAgent intentionally not persisted (not present in schema)

    const user = await this.prisma.user.findUnique({ where: { email: loginDto.email.toLowerCase() } });
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const passwordValid = await bcrypt.compare(loginDto.password, user.passwordHash);
    if (!passwordValid) throw new UnauthorizedException('Invalid email or password');

    const payload: JwtPayload = { sub: user.id, email: user.email, role: user.role as Role };
    const accessToken = JWT.signAccess(payload);
    const refreshToken = JWT.signRefresh(payload);

    await this.prisma.refreshToken.create({
      data: {
        token: crypto.createHash('sha256').update(refreshToken).digest('hex'),
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    setAuthCookies(res, accessToken, refreshToken);
    return { user: { id: user.id, email: user.email, role: user.role } };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token using valid refresh token cookie' })
  async refreshToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const raw = req.cookies?.[REFRESH_COOKIE];
    if (!raw) throw new UnauthorizedException('No refresh token provided');

    const payload = JWT.verifyRefresh<JwtPayload>(raw);
    if (!payload) throw new UnauthorizedException('Invalid or expired refresh token');

    const tokenHash = crypto.createHash('sha256').update(raw).digest('hex');
    const stored = await this.prisma.refreshToken.findFirst({ where: { token: tokenHash } });
    if (!stored || stored.revoked || stored.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token is no longer valid');
    }

    // rotate
    await this.prisma.refreshToken.update({ where: { id: stored.id }, data: { revoked: true } });

    const newPayload: JwtPayload = { sub: payload.sub, email: payload.email, role: payload.role };
    const accessToken = JWT.signAccess(newPayload);
    const refreshToken = JWT.signRefresh(newPayload);

    await this.prisma.refreshToken.create({
      data: {
        token: crypto.createHash('sha256').update(refreshToken).digest('hex'),
        userId: payload.sub,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    setAuthCookies(res, accessToken, refreshToken);
    return { message: 'Token refreshed' };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout current user' })
  async logout(
    @CurrentUser('sub') userId: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies?.[REFRESH_COOKIE];
    if (refreshToken) {
      const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
      await this.prisma.refreshToken.updateMany({ where: { token: tokenHash, userId }, data: { revoked: true } });
    } else {
      await this.prisma.refreshToken.updateMany({ where: { userId, revoked: false }, data: { revoked: true } });
    }

    res.clearCookie(ACCESS_COOKIE, { path: '/' });
    res.clearCookie(REFRESH_COOKIE, { path: '/' });

    return { message: 'Logged out successfully' };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get current authenticated user profile' })
  async me(@CurrentUser() user: any) {
    return { user };
  }
}