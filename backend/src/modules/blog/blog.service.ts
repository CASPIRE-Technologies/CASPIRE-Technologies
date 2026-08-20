import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async findAllPublic(categorySlug?: string, search?: string, tag?: string) {
    const where: any = { isPublished: true };

    if (categorySlug) {
      where.category = { slug: categorySlug };
    }

    if (tag) {
      where.tags = { contains: tag };
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { excerpt: { contains: search } },
        { content: { contains: search } },
      ];
    }

    return this.prisma.blogPost.findMany({
      where,
      include: { category: true },
      orderBy: { publishedAt: 'desc' },
    });
  }

  async findBySlugPublic(slug: string) {
    const post = await this.prisma.blogPost.findUnique({
      where: { slug },
      include: { category: true },
    });
    if (!post || !post.isPublished) {
      throw new NotFoundException(`Blog article '${slug}' not found`);
    }

    // Related posts in same category
    const related = await this.prisma.blogPost.findMany({
      where: {
        categoryId: post.categoryId,
        isPublished: true,
        id: { not: post.id },
      },
      take: 3,
      orderBy: { publishedAt: 'desc' },
    });

    return { post, related };
  }

  async getCategories() {
    return this.prisma.blogCategory.findMany();
  }

  async findAllAdmin() {
    return this.prisma.blogPost.findMany({
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: any) {
    return this.prisma.blogPost.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.blogPost.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.blogPost.delete({ where: { id } });
  }
}
