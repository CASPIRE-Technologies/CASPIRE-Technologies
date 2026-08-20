import { Injectable, BadRequestException, NotFoundException, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEnquiryDto, UpdateEnquiryStatusDto, AddEnquiryNoteDto } from './dto/enquiry.dto';
import { EnquiryStatus } from '@prisma/client';

@Injectable()
export class EnquiriesService {
  private readonly logger = new Logger(EnquiriesService.name);

  constructor(private prisma: PrismaService) {}

  async create(dto: CreateEnquiryDto) {
    // Spam honeypot check: if honeypot field is filled, silently ignore
    if (dto.website_url_hp && dto.website_url_hp.trim() !== '') {
      this.logger.warn(`Honeypot triggered by spam submission from ${dto.email}`);
      return { success: true, message: 'Enquiry received successfully.' };
    }

    const enquiry = await this.prisma.enquiry.create({
      data: {
        name: dto.name,
        company: dto.company,
        email: dto.email.toLowerCase(),
        telephone: dto.telephone,
        country: dto.country || 'Sri Lanka',
        serviceOfInterest: dto.serviceOfInterest,
        budgetRange: dto.budgetRange,
        preferredContactMethod: dto.preferredContactMethod,
        description: dto.description,
        consent: dto.consent,
        status: EnquiryStatus.NEW,
      },
    });

    // Record audit log
    await this.prisma.auditLog.create({
      data: {
        action: 'ENQUIRY_SUBMITTED',
        entityType: 'Enquiry',
        entityId: enquiry.id,
        details: `Enquiry submitted by ${enquiry.name} (${enquiry.company}) for service ${enquiry.serviceOfInterest}`,
      },
    });

    // Try sending email notification asynchronously
    this.sendNotificationEmail(enquiry).catch((err) => {
      this.logger.error(`Email dispatch warning (saved in DB successfully): ${err.message}`);
    });

    return {
      success: true,
      message: 'Thank you for contacting Apex Software Engineering. Our consultation team will respond within 24 business hours.',
      enquiryId: enquiry.id,
    };
  }

  async findAllAdmin(status?: string, search?: string) {
    const where: any = {};

    if (status && status !== 'ALL') {
      where.status = status as EnquiryStatus;
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { company: { contains: search } },
        { email: { contains: search } },
        { serviceOfInterest: { contains: search } },
      ];
    }

    return this.prisma.enquiry.findMany({
      where,
      include: {
        notes: {
          include: { author: { select: { id: true, name: true, email: true } } },
          orderBy: { createdAt: 'desc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneAdmin(id: string) {
    const enquiry = await this.prisma.enquiry.findUnique({
      where: { id },
      include: {
        notes: {
          include: { author: { select: { id: true, name: true, email: true } } },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    if (!enquiry) {
      throw new NotFoundException(`Enquiry #${id} not found`);
    }
    return enquiry;
  }

  async updateStatus(id: string, dto: UpdateEnquiryStatusDto, userId: string) {
    const enquiry = await this.prisma.enquiry.update({
      where: { id },
      data: { status: dto.status as EnquiryStatus },
    });

    await this.prisma.auditLog.create({
      data: {
        userId,
        action: 'ENQUIRY_STATUS_UPDATED',
        entityType: 'Enquiry',
        entityId: id,
        details: `Status changed to ${dto.status}`,
      },
    });

    return enquiry;
  }

  async addNote(id: string, dto: AddEnquiryNoteDto, userId: string) {
    const enquiry = await this.prisma.enquiry.findUnique({ where: { id } });
    if (!enquiry) {
      throw new NotFoundException(`Enquiry #${id} not found`);
    }

    const note = await this.prisma.enquiryNote.create({
      data: {
        enquiryId: id,
        authorId: userId,
        note: dto.note,
      },
      include: {
        author: { select: { id: true, name: true, email: true } },
      },
    });

    return note;
  }

  private async sendNotificationEmail(enquiry: any) {
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser) {
      this.logger.log('SMTP configuration not provided; skipping email notification.');
      return;
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: `"Apex System Alert" <${smtpUser}>`,
      to: process.env.NOTIFICATION_EMAIL || 'contact@apexsoftware.lk',
      subject: `[New Enquiry] ${enquiry.serviceOfInterest} - ${enquiry.company}`,
      html: `
        <h2>New Consultation Request Received</h2>
        <p><strong>Name:</strong> ${enquiry.name}</p>
        <p><strong>Company:</strong> ${enquiry.company}</p>
        <p><strong>Email:</strong> ${enquiry.email}</p>
        <p><strong>Phone:</strong> ${enquiry.telephone}</p>
        <p><strong>Country:</strong> ${enquiry.country}</p>
        <p><strong>Service:</strong> ${enquiry.serviceOfInterest}</p>
        <p><strong>Budget:</strong> ${enquiry.budgetRange}</p>
        <p><strong>Preferred Contact:</strong> ${enquiry.preferredContactMethod}</p>
        <hr/>
        <p><strong>Requirements Description:</strong></p>
        <p>${enquiry.description}</p>
      `,
    });

    this.logger.log(`Email notification sent for enquiry #${enquiry.id}`);
  }
}
