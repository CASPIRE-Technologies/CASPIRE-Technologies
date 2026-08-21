import { Module } from '@nestjs/common';
import { IndustriesService } from './industries.service.js';
import { IndustriesController } from './industries.controller.js';

@Module({
  controllers: [IndustriesController],
  providers: [IndustriesService],
  exports: [IndustriesService],
})
export class IndustriesModule {}
