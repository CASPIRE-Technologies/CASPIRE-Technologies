import { Controller, Get, Post, Put, Delete, Param, Query, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RoleType } from '@prisma/client';

@ApiTags('Blog')
@Controller('v1/blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  @ApiOperation({ summary: 'Get published blog posts with search and category filters' })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'tag', required: false })
  async getPublicPosts(
    @Query('category') category?: string,
    @Query('search') search?: string,
    @Query('tag') tag?: string,
  ) {
    return this.blogService.findAllPublic(category, search, tag);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get all blog categories' })
  async getCategories() {
    return this.blogService.getCategories();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get article details and related articles by slug' })
  async getPostBySlug(@Param('slug') slug: string) {
    return this.blogService.findBySlugPublic(slug);
  }

  @Get('admin/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all blog posts (Admin)' })
  async getAdminPosts() {
    return this.blogService.findAllAdmin();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create blog post (Admin)' })
  async createPost(@Body() body: any) {
    return this.blogService.create(body);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update blog post (Admin)' })
  async updatePost(@Param('id') id: string, @Body() body: any) {
    return this.blogService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete blog post (Superadmin)' })
  async deletePost(@Param('id') id: string) {
    return this.blogService.delete(id);
  }
}
