import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class IndustriesService {
  constructor(private prisma: PrismaService) {}

  async findAllPublic() {
    return this.prisma.industry.findMany({
      where: { isPublished: true },
      orderBy: { displayOrder: 'asc' },
    });
  }

  async findBySlugPublic(slug: string) {
    const ind = await this.prisma.industry.findUnique({
      where: { slug },
    });
    if (!ind || !ind.isPublished) {
      throw new NotFoundException(`Industry with slug '${slug}' not found`);
    }
    return ind;
  }

  async findAllAdmin() {
    return this.prisma.industry.findMany({
      orderBy: { displayOrder: 'asc' },
    });
  }

  async create(data: any) {
    return this.prisma.industry.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.industry.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.industry.delete({ where: { id } });
  }
}
