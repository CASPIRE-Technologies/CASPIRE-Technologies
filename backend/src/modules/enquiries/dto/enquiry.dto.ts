import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsBoolean, IsOptional, MinLength } from 'class-validator';

export class CreateEnquiryDto {
  @ApiProperty({ example: 'Kusal Perera', description: 'Contact person name' })
  @IsString()
  @IsNotEmpty({ message: 'Full name is required' })
  name: string;

  @ApiProperty({ example: 'Lanka Tech Solutions', description: 'Company name' })
  @IsString()
  @IsNotEmpty({ message: 'Company name is required' })
  company: string;

  @ApiProperty({ example: 'kusal@lankatech.lk', description: 'Email address' })
  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email address is required' })
  email: string;

  @ApiProperty({ example: '+94 77 123 4567', description: 'Telephone number' })
  @IsString()
  @IsNotEmpty({ message: 'Telephone number is required' })
  telephone: string;

  @ApiProperty({ example: 'Sri Lanka', description: 'Country of operation' })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({ example: 'Custom Web Applications', description: 'Service of interest' })
  @IsString()
  @IsNotEmpty({ message: 'Service of interest is required' })
  serviceOfInterest: string;

  @ApiProperty({ example: '$5,000 - $10,000', description: 'Estimated project budget' })
  @IsString()
  @IsNotEmpty({ message: 'Budget range is required' })
  budgetRange: string;

  @ApiProperty({ example: 'Email', description: 'Preferred contact method' })
  @IsString()
  @IsNotEmpty()
  preferredContactMethod: string;

  @ApiProperty({ example: 'We require a custom web application for stock control...', description: 'Project requirements' })
  @IsString()
  @IsNotEmpty({ message: 'Project description is required' })
  @MinLength(10, { message: 'Project description must be at least 10 characters' })
  description: string;

  @ApiProperty({ example: true, description: 'Consent to terms and privacy policy' })
  @IsBoolean()
  consent: boolean;

  @ApiProperty({ description: 'Spam honeypot field - must be empty', required: false })
  @IsOptional()
  website_url_hp?: string;
}

export class UpdateEnquiryStatusDto {
  @ApiProperty({ example: 'IN_REVIEW', enum: ['NEW', 'IN_REVIEW', 'CONTACTED', 'CLOSED'] })
  @IsString()
  @IsNotEmpty()
  status: 'NEW' | 'IN_REVIEW' | 'CONTACTED' | 'CLOSED';
}

export class AddEnquiryNoteDto {
  @ApiProperty({ example: 'Followed up via telephone call with Kusal on Aug 14.', description: 'Internal note text' })
  @IsString()
  @IsNotEmpty({ message: 'Note text cannot be empty' })
  note: string;
}
