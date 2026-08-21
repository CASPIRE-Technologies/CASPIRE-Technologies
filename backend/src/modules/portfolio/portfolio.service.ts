import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class PortfolioService {
  constructor(private prisma: PrismaService) {}

  async findAllPublic(industry?: string, technology?: string) {
    const where: any = { isPublished: true };

    if (industry) {
      where.clientIndustry = { contains: industry };
    }

    if (technology) {
      where.technologies = { contains: technology };
    }

    return this.prisma.portfolioProject.findMany({
      where,
      orderBy: { displayOrder: 'asc' },
    });
  }

  async findBySlugPublic(slug: string) {
    const proj = await this.prisma.portfolioProject.findUnique({
      where: { slug },
    });
    if (!proj || !proj.isPublished) {
      throw new NotFoundException(`Portfolio project '${slug}' not found`);
    }
    return proj;
  }

  async findAllAdmin() {
    return this.prisma.portfolioProject.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: any) {
    return this.prisma.portfolioProject.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.portfolioProject.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.portfolioProject.delete({ where: { id } });
  }
}
