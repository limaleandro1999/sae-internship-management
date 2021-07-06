import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { MonthlyReport } from './monthly-report.entity';
import { ReportsService } from './reports.service';
import { SemesterReport } from './semester-report.entity';
import { ReportsController } from './reports.controller';
import { Task } from 'src/tasks/task.entity';
import { TasksService } from 'src/tasks/tasks.service';
import { InternsService } from 'src/interns/interns.service';
import { Intern } from 'src/interns/intern.entity';
import { EmailsService } from 'src/emails/emails.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SemesterReport,
      MonthlyReport,
      User,
      Task,
      Intern,
    ]),
  ],
  exports: [ReportsService],
  providers: [
    ReportsService,
    UsersService,
    TasksService,
    InternsService,
    EmailsService,
  ],
  controllers: [ReportsController],
})
export class ReportsModule {}
