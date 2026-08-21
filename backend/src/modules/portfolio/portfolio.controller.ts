import { Controller, Get, Post, Put, Delete, Param, Query, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { PortfolioService } from './portfolio.service.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { RoleType } from '../../generated/prisma/client.js';

@ApiTags('Portfolio')
@Controller('v1/portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  @ApiOperation({ summary: 'Get published portfolio projects (filterable)' })
  @ApiQuery({ name: 'industry', required: false })
  @ApiQuery({ name: 'technology', required: false })
  async getPublicProjects(
    @Query('industry') industry?: string,
    @Query('technology') technology?: string,
  ) {
    return this.portfolioService.findAllPublic(industry, technology);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get project details by slug' })
  async getProjectBySlug(@Param('slug') slug: string) {
    return this.portfolioService.findBySlugPublic(slug);
  }

  @Get('admin/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all portfolio projects (Admin)' })
  async getAdminProjects() {
    return this.portfolioService.findAllAdmin();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create portfolio project (Admin)' })
  async createProject(@Body() body: any) {
    return this.portfolioService.create(body);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update portfolio project (Admin)' })
  async updateProject(@Param('id') id: string, @Body() body: any) {
    return this.portfolioService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete portfolio project (Superadmin)' })
  async deleteProject(@Param('id') id: string) {
    return this.portfolioService.delete(id);
  }
}
