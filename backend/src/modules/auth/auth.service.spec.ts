import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { expect, jest, it, beforeEach, describe } from '@jest/globals';
import { AuthService } from './auth.service.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;

  const mockPrismaService: any = {
    user: {
      findUnique: jest.fn(),
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
  };

  beforeEach(async () => {
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

  it('should throw UnauthorizedException for invalid email', async () => {
    mockPrismaService.user.findUnique.mockResolvedValue(null);

    await expect(
      service.login({ email: 'nonexistent@apexsoftware.lk', password: 'password' }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException for invalid password', async () => {
    const hashedPassword = await bcrypt.hash('correctPassword', 10);
    mockPrismaService.user.findUnique.mockResolvedValue({
      id: '1',
      email: 'admin@apexsoftware.lk',
      passwordHash: hashedPassword,
      status: 'ACTIVE',
      role: 'ADMIN',
    } as any);

    await expect(
      service.login({ email: 'admin@apexsoftware.lk', password: 'wrongPassword' }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
