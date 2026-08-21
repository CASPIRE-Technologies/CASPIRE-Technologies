import { Test, TestingModule } from '@nestjs/testing';
import { EnquiriesService } from './enquiries.service.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { expect, jest, it, beforeEach, describe } from '@jest/globals';

describe('EnquiriesService', () => {
  let service: EnquiriesService;

  const mockPrismaService = {
    enquiry: {
      create: jest.fn().mockImplementation((args: any) => Promise.resolve({ id: 'enq-123', ...args.data })),
      findMany: jest.fn().mockResolvedValue([]),
      findUnique: jest.fn(),
    },
    auditLog: {
      create: jest.fn<() => Promise<{ id: string }>>(async () => ({ id: 'log-1' })),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnquiriesService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<EnquiriesService>(EnquiriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should successfully create an enquiry and return confirmation message', async () => {
    const dto = {
      name: 'Chaminda Silva',
      company: 'Ceylon Trading Ltd',
      email: 'chaminda@ceylontrading.lk',
      telephone: '+94 77 111 2222',
      country: 'Sri Lanka',
      serviceOfInterest: 'Custom Web Applications',
      budgetRange: '$5,000 - $10,000',
      preferredContactMethod: 'Email',
      description: 'Need a custom web portal for international buyer orders.',
      consent: true,
    };

    const res = await service.create(dto);
    expect(res.success).toBe(true);
    expect(res.enquiryId).toBe('enq-123');
    expect(mockPrismaService.enquiry.create).toHaveBeenCalled();
  });

  it('should handle honeypot bot submissions silently', async () => {
    const dto = {
      name: 'Bot User',
      company: 'Spam Co',
      email: 'bot@spam.com',
      telephone: '00000000',
      serviceOfInterest: 'Web',
      budgetRange: '$1,000',
      preferredContactMethod: 'Email',
      description: 'Spam text here',
      consent: true,
      website_url_hp: 'http://spam-link.com',
    };

    const res = await service.create(dto);
    expect(res.success).toBe(true);
    expect(mockPrismaService.enquiry.create).not.toHaveBeenCalled();
  });
});
