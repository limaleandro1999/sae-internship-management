import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternshipAdvisorsService } from './internship-advisors.service';
import { InternshipAdvisorsController } from './internship-advisors.controller';
import { InternshipAdvisor } from './internship-advisor.entity';
import { User } from 'src/users/user.entity';
import { EmailsService } from 'src/emails/emails.service';
import { UsersService } from 'src/users/users.service';
import { InternshipProcessesService } from 'src/internship-processes/internship-processes.service';
import { InternshipProcess } from 'src/internship-processes/internship-process.entity';
import { CompaniesService } from 'src/companies/companies.service';
import { InternsService } from 'src/interns/interns.service';
import { ReportsService } from 'src/reports/reports.service';
import { Company } from 'src/companies/company.entity';
import { Intern } from 'src/interns/intern.entity';
import { SemesterReport } from 'src/reports/semester-report.entity';
import { MonthlyReport } from 'src/reports/monthly-report.entity';
import { TasksService } from 'src/tasks/tasks.service';
import { Task } from 'src/tasks/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InternshipAdvisor,
      User,
      InternshipProcess,
      Company,
      Intern,
      SemesterReport,
      MonthlyReport,
      Task,
    ]),
  ],
  providers: [
    InternshipAdvisorsService,
    EmailsService,
    UsersService,
    InternshipProcessesService,
    CompaniesService,
    InternsService,
    ReportsService,
    TasksService,
  ],
  controllers: [InternshipAdvisorsController],
})
export class InternshipAdvisorsModule {}
