import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { IndustriesService } from './industries.service.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { RoleType } from '../../generated/prisma/client.js';

@ApiTags('Industries')
@Controller('v1/industries')
export class IndustriesController {
  constructor(private readonly industriesService: IndustriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all published industries' })
  async getPublicIndustries() {
    return this.industriesService.findAllPublic();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get single industry details by slug' })
  async getIndustryBySlug(@Param('slug') slug: string) {
    return this.industriesService.findBySlugPublic(slug);
  }

  @Get('admin/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all industries for admin (Admin)' })
  async getAdminIndustries() {
    return this.industriesService.findAllAdmin();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create industry (Admin)' })
  async createIndustry(@Body() body: any) {
    return this.industriesService.create(body);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update industry (Admin)' })
  async updateIndustry(@Param('id') id: string, @Body() body: any) {
    return this.industriesService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete industry (Superadmin)' })
  async deleteIndustry(@Param('id') id: string) {
    return this.industriesService.delete(id);
  }
}
