import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  exports: [CompaniesService],
  providers: [CompaniesService],
  controllers: [CompaniesController],
})
export class CompaniesModule {}
