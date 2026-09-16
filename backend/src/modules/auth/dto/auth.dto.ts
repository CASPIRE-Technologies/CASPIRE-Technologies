import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'Kusal Perera', description: 'Contact person name' })
  @IsString()
  @IsNotEmpty({ message: 'Full name is required' })
  full_name!: string;

  @ApiProperty({ example: 'kusal@lankatech.lk', description: 'Email address' })
  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email address is required' })
  email!: string;

  @ApiProperty({ example: 'AdminPass123!', description: 'Account password' })
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password!: string;

  @ApiProperty({ example: 'AdminPass123!', description: 'Account password' })
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password_confirmation!: string;
}
export class LoginDto {
  @ApiProperty({ example: 'admin@CASPIREsoftware.lk', description: 'User email address' })
  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: 'AdminPass123!', description: 'Account password' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password!: string;
}

export class RefreshTokenDto {
  @ApiProperty({ description: 'Valid refresh token string' })
  @IsString()
  @IsNotEmpty()
  refreshToken!: string;
}
