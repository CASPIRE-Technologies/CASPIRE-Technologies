import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async getPublicSettings() {
    const settings = await this.prisma.siteSetting.findMany();
    // Return key-value dictionary for fast lookup in frontend
    return settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);
  }

  async getAllAdmin() {
    return this.prisma.siteSetting.findMany();
  }

  async updateSetting(key: string, value: string, userId: string) {
    const updated = await this.prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value, description: 'Updated via admin panel' },
    });

    await this.prisma.auditLog.create({
      data: {
        userId,
        action: 'SETTING_UPDATED',
        entityType: 'SiteSetting',
        entityId: key,
        details: `Updated setting ${key} = ${value}`,
      },
    });

    return updated;
  }
}
