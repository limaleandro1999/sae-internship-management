import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonthlyReport } from 'src/reports/monthly-report.entity';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task, MonthlyReport])],
  providers: [TasksService],
})
export class TasksModule {}
