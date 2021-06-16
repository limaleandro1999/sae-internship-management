import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { MonthlyReport } from './monthly-report.entity';
import { ReportsService } from './reports.service';
import { SemesterReport } from './semester-report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SemesterReport, MonthlyReport, User])],
  exports: [ReportsService],
  providers: [ReportsService, UsersService],
})
export class ReportsModule {}
