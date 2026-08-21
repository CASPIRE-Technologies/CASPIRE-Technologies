import { Controller, Post, Get, Put, Param, Body, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { EnquiriesService } from './enquiries.service.js';
import { CreateEnquiryDto, UpdateEnquiryStatusDto, AddEnquiryNoteDto } from './dto/enquiry.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { RoleType } from '../../generated/prisma/client.js';

@ApiTags('Contact & Enquiries')
@Controller('v1/enquiries')
export class EnquiriesController {
  constructor(private readonly enquiriesService: EnquiriesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Submit a public consultation request' })
  async createEnquiry(@Body() dto: CreateEnquiryDto) {
    return this.enquiriesService.create(dto);
  }

  @Get('admin/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List enquiries for admin with status filter & search' })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'search', required: false })
  async getAdminEnquiries(
    @Query('status') status?: string,
    @Query('search') search?: string,
  ) {
    return this.enquiriesService.findAllAdmin(status, search);
  }

  @Get('admin/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get single enquiry details with notes timeline' })
  async getAdminEnquiryById(@Param('id') id: string) {
    return this.enquiriesService.findOneAdmin(id);
  }

  @Put('admin/:id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update enquiry status' })
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateEnquiryStatusDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.enquiriesService.updateStatus(id, dto, userId);
  }

  @Post('admin/:id/notes')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add internal note to enquiry' })
  async addNote(
    @Param('id') id: string,
    @Body() dto: AddEnquiryNoteDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.enquiriesService.addNote(id, dto, userId);
  }
}
