import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonthlyReport } from './monthly-report.entity';
import { ReportsService } from './reports.service';
import { SemesterReport } from './semester-report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SemesterReport, MonthlyReport])],
  providers: [ReportsService],
})
export class ReportsModule {}
