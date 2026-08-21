import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuditLogsService } from './audit-logs.service.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { RoleType } from '../../generated/prisma/client.js';

@ApiTags('Audit Logs')
@Controller('v1/audit-logs')
export class AuditLogsController {
  constructor(private readonly auditLogsService: AuditLogsService) {}

  @Get('admin/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'View security & administrative audit logs (Superadmin)' })
  async getAuditLogs() {
    return this.auditLogsService.findAllAdmin();
  }
}
