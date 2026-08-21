import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async findAllPublic() {
    return this.prisma.teamMember.findMany({
      where: { isPublished: true },
      orderBy: { displayOrder: 'asc' },
    });
  }

  async findAllAdmin() {
    return this.prisma.teamMember.findMany({
      orderBy: { displayOrder: 'asc' },
    });
  }

  async create(data: any) {
    return this.prisma.teamMember.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.teamMember.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.teamMember.delete({ where: { id } });
  }
}
