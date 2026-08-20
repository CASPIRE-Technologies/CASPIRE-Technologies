import { Module } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD, APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { ServicesModule } from './modules/services/services.module';
import { IndustriesModule } from './modules/industries/industries.module';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { BlogModule } from './modules/blog/blog.module';
import { EnquiriesModule } from './modules/enquiries/enquiries.module';
import { TeamModule } from './modules/team/team.module';
import { SettingsModule } from './modules/settings/settings.module';
import { AuditLogsModule } from './modules/audit-logs/audit-logs.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 30, // 30 requests per minute
      },
    ]),
    PrismaModule,
    AuthModule,
    ServicesModule,
    IndustriesModule,
    PortfolioModule,
    BlogModule,
    EnquiriesModule,
    TeamModule,
    SettingsModule,
    AuditLogsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
