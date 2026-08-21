import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service.js';
import { PortfolioController } from './portfolio.controller.js';

@Module({
  controllers: [PortfolioController],
  providers: [PortfolioService],
  exports: [PortfolioService],
})
export class PortfolioModule {}
