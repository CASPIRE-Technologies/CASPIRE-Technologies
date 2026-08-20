import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async findAllPublic() {
    return this.prisma.service.findMany({
      where: { isPublished: true },
      orderBy: { displayOrder: 'asc' },
    });
  }

  async findBySlugPublic(slug: string) {
    const service = await this.prisma.service.findUnique({
      where: { slug },
    });
    if (!service || !service.isPublished) {
      throw new NotFoundException(`Service with slug '${slug}' not found`);
    }
    return service;
  }

  async findAllAdmin() {
    return this.prisma.service.findMany({
      orderBy: { displayOrder: 'asc' },
    });
  }

  async create(data: any) {
    return this.prisma.service.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.service.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.service.delete({ where: { id } });
  }
}
