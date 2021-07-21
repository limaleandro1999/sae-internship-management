import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesService } from 'src/companies/companies.service';
import { Company } from 'src/companies/company.entity';
import { EmailsService } from 'src/emails/emails.service';
import { Intern } from 'src/interns/intern.entity';
import { InternsService } from 'src/interns/interns.service';
import { MonthlyReport } from 'src/reports/monthly-report.entity';
import { ReportsService } from 'src/reports/reports.service';
import { SemesterReport } from 'src/reports/semester-report.entity';
import { Task } from 'src/tasks/task.entity';
import { TasksService } from 'src/tasks/tasks.service';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { AdditiveTerm } from './additive-term.entity';
import { InternshipProcess } from './internship-process.entity';
import { InternshipProcessesController } from './internship-processes.controller';
import { InternshipProcessesService } from './internship-processes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InternshipProcess,
      Intern,
      Company,
      User,
      SemesterReport,
      Task,
      MonthlyReport,
      AdditiveTerm,
    ]),
  ],
  controllers: [InternshipProcessesController],
  providers: [
    InternshipProcessesService,
    InternsService,
    CompaniesService,
    UsersService,
    EmailsService,
    ReportsService,
    TasksService,
  ],
})
export class InternshipProcessesModule {}
