import { Module } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD, APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { ServicesModule } from './modules/services/services.module.js';
import { IndustriesModule } from './modules/industries/industries.module.js';
import { PortfolioModule } from './modules/portfolio/portfolio.module.js';
import { BlogModule } from './modules/blog/blog.module.js';
import { EnquiriesModule } from './modules/enquiries/enquiries.module.js';
import { TeamModule } from './modules/team/team.module.js';
import { SettingsModule } from './modules/settings/settings.module.js';
import { AuditLogsModule } from './modules/audit-logs/audit-logs.module.js';
import { HttpExceptionFilter } from './common/filters/http-exception.filter.js';

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
