import { Controller, Get, Put, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SettingsService } from './settings.service.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { RoleType } from '../../generated/prisma/client.js';

@ApiTags('Site Settings')
@Controller('v1/settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  @ApiOperation({ summary: 'Get public site settings dictionary' })
  async getPublicSettings() {
    return this.settingsService.getPublicSettings();
  }

  @Get('admin/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all site settings list (Admin)' })
  async getAdminSettings() {
    return this.settingsService.getAllAdmin();
  }

  @Put('admin/:key')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update site setting (Superadmin)' })
  async updateSetting(
    @Param('key') key: string,
    @Body('value') value: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.settingsService.updateSetting(key, value, userId);
  }
}
