import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { expect, jest, it, beforeEach, describe } from '@jest/globals';
import { AuthService } from './auth.service.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { UnauthorizedException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;

  const mockPrismaService: any = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    auditLog: {
      create: jest.fn(),
    },
    refreshToken: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
    },
  };

  const mockJwtService: any = {
    sign: jest.fn().mockReturnValue('mocked-token'),
    verify: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should throw UnauthorizedException for invalid email', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(
        service.login({ email: 'nonexistent@CASPIREsoftware.lk', password: 'password' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException for invalid password', async () => {
      const hashedPassword = await bcrypt.hash('correctPassword', 10);
      mockPrismaService.user.findUnique.mockResolvedValue({
        id: '1',
        email: 'admin@CASPIREsoftware.lk',
        passwordHash: hashedPassword,
        status: 'ACTIVE',
        role: 'ADMIN',
      });

      await expect(
        service.login({ email: 'admin@CASPIREsoftware.lk', password: 'wrongPassword' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should return tokens and user on valid credentials', async () => {
      const hashedPassword = await bcrypt.hash('correctPassword', 10);
      mockPrismaService.user.findUnique.mockResolvedValue({
        id: '1',
        email: 'admin@CASPIREsoftware.lk',
        passwordHash: hashedPassword,
        status: 'ACTIVE',
        role: 'ADMIN',
      });
      mockPrismaService.refreshToken.create.mockResolvedValue({});

      const result = await service.login({
        email: 'admin@CASPIREsoftware.lk',
        password: 'correctPassword',
      });

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(result.user).toEqual({ id: '1', email: 'admin@CASPIREsoftware.lk', role: 'ADMIN' });
      expect(mockPrismaService.refreshToken.create).toHaveBeenCalledTimes(1);
    });

    it('should reject login for a non-active user, if status is enforced', async () => {
      const hashedPassword = await bcrypt.hash('correctPassword', 10);
      mockPrismaService.user.findUnique.mockResolvedValue({
        id: '1',
        email: 'suspended@CASPIREsoftware.lk',
        passwordHash: hashedPassword,
        status: 'SUSPENDED',
        role: 'ADMIN',
      });

      await expect(
        service.login({ email: 'suspended@CASPIREsoftware.lk', password: 'correctPassword' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('register', () => {
    it('should throw ConflictException if email already exists', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue({ id: '1', email: 'taken@CASPIREsoftware.lk' });

      await expect(
        service.register({
          email: 'taken@caspire.lk', 
          password: 'password123',
          full_name: 'caspire',
          password_confirmation: 'password123'
        }),
      ).rejects.toThrow(ConflictException);
    });

    it('should create a user with hashed password and default USER role', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);
      mockPrismaService.user.create.mockResolvedValue({
        id: '2',
        email: 'new@caspire.lk',
        role: 'USER',
      });
      mockPrismaService.refreshToken.create.mockResolvedValue({});

      const result = await service.register({
        email: 'new@CASPIREsoftware.lk',
        password: 'password123',
        full_name: 'new-caspire',
        password_confirmation: 'password123'
      });

      expect(mockPrismaService.user.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            email: 'new@CASPIREsoftware.lk',
            role: 'USER',
          }),
        }),
      );
      // password should never be stored in plaintext
      const createArgs = mockPrismaService.user.create.mock.calls[0][0];
      expect(createArgs.data.password ?? createArgs.data.passwordHash).not.toBe('password123');
      expect(result.user).toEqual({ id: '2', email: 'new@CASPIREsoftware.lk', role: 'USER' });
    });
  });

  describe('refreshToken', () => {
    it('should throw UnauthorizedException if no token is provided', async () => {
      await expect(service.refreshToken(undefined)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if stored token is revoked', async () => {
      mockJwtService.verify.mockReturnValue({ sub: '1', email: 'admin@CASPIREsoftware.lk', role: 'ADMIN' });
      mockPrismaService.refreshToken.findUnique.mockResolvedValue({
        tokenHash: 'somehash',
        revoked: true,
        expiresAt: new Date(Date.now() + 100000),
      });

      await expect(service.refreshToken('some-refresh-token')).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if stored token is expired', async () => {
      mockJwtService.verify.mockReturnValue({ sub: '1', email: 'admin@CASPIREsoftware.lk', role: 'ADMIN' });
      mockPrismaService.refreshToken.findUnique.mockResolvedValue({
        tokenHash: 'somehash',
        revoked: false,
        expiresAt: new Date(Date.now() - 1000),
      });

      await expect(service.refreshToken('some-refresh-token')).rejects.toThrow(UnauthorizedException);
    });

    it('should rotate the refresh token and return a new pair', async () => {
      mockJwtService.verify.mockReturnValue({ sub: '1', email: 'admin@CASPIREsoftware.lk', role: 'ADMIN' });
      mockPrismaService.refreshToken.findUnique.mockResolvedValue({
        tokenHash: 'somehash',
        revoked: false,
        expiresAt: new Date(Date.now() + 100000),
      });
      mockPrismaService.refreshToken.update.mockResolvedValue({});
      mockPrismaService.refreshToken.create.mockResolvedValue({});

      const result = await service.refreshToken('valid-refresh-token');

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(mockPrismaService.refreshToken.update).toHaveBeenCalledWith(
        expect.objectContaining({ data: { revoked: true } }),
      );
      expect(mockPrismaService.refreshToken.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('logout', () => {
    it('should revoke only the given session when a refresh token is provided', async () => {
      mockPrismaService.refreshToken.updateMany.mockResolvedValue({ count: 1 });

      const result = await service.logout('1', 'some-refresh-token');

      expect(mockPrismaService.refreshToken.updateMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ userId: '1' }),
          data: { revoked: true },
        }),
      );
      expect(result).toEqual({ message: 'Logged out successfully' });
    });

    it('should revoke all sessions when no refresh token is provided', async () => {
      mockPrismaService.refreshToken.updateMany.mockResolvedValue({ count: 3 });

      const result = await service.logout('1');

      expect(mockPrismaService.refreshToken.updateMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { userId: '1', revoked: false },
          data: { revoked: true },
        }),
      );
      expect(result).toEqual({ message: 'Logged out successfully' });
    });
  });
});