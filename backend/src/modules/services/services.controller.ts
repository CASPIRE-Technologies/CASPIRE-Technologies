import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ServicesService } from './services.service.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { RoleType } from '../../generated/prisma/client.js';

@ApiTags('Services')
@Controller('v1/services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all published services' })
  async getPublicServices() {
    return this.servicesService.findAllPublic();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get single service details by slug' })
  async getServiceBySlug(@Param('slug') slug: string) {
    return this.servicesService.findBySlugPublic(slug);
  }

  @Get('admin/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all services for admin portal (published and draft)' })
  async getAdminServices() {
    return this.servicesService.findAllAdmin();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new service (Admin)' })
  async createService(@Body() body: any) {
    return this.servicesService.create(body);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update service details (Admin)' })
  async updateService(@Param('id') id: string, @Body() body: any) {
    return this.servicesService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete service (Superadmin)' })
  async deleteService(@Param('id') id: string) {
    return this.servicesService.delete(id);
  }
}
