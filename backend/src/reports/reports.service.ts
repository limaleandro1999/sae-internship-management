import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderClause } from 'src/common/interfaces/order-clause.interface';
import { InternsService } from 'src/interns/interns.service';
import { TasksService } from 'src/tasks/tasks.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateMonthlyReportDTO } from './dto/create-monthly-report.dto';
import { CreateSemesterReportDTO } from './dto/create-semester-report.dto';
import { MonthlyReport } from './monthly-report.entity';
import { SemesterReport } from './semester-report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(SemesterReport)
    private semesterReportRepository: Repository<SemesterReport>,
    @InjectRepository(MonthlyReport)
    private monthlyReportRepository: Repository<MonthlyReport>,
    private readonly userService: UsersService,
    private readonly tasksService: TasksService,
    private readonly internsService: InternsService,
  ) {}

  create(semesterReport: CreateSemesterReportDTO): Promise<SemesterReport> {
    return this.semesterReportRepository.save(semesterReport);
  }

  async createMonthlyReport(
    email: string,
    createMonthlyReportDTO: CreateMonthlyReportDTO,
  ) {
    const {
      internshipProcesses: [internshipProcess],
    } = await this.internsService.getInternInfo(email);
    const { month, year } = createMonthlyReportDTO;
    const startDate = new Date(year, month - 1, 1, 0, 0);
    const finishDate = new Date(year, month - 1, 23, 59, 59);
    const tasks = await this.tasksService.getTasksByDateRangeAndEmail(
      internshipProcess.id,
      startDate,
      finishDate,
    );
    return this.monthlyReportRepository.save({
      startDate,
      finishDate,
      internshipProcess,
      tasks,
    });
  }

  async getInternSemesterReports(
    email: string,
    skip?: number,
    take?: number,
  ): Promise<[SemesterReport[], number]> {
    const user = await this.userService.findUser(email);

    return this.semesterReportRepository
      .createQueryBuilder('semesterReport')
      .innerJoinAndSelect(
        'semesterReport.internshipProcess',
        'internshipProcess',
      )
      .innerJoinAndSelect('internshipProcess.intern', 'intern')
      .where('intern.id = :internId', { internId: user?.intern?.id })
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }

  async getInternMonthlyReports(
    email: string,
    skip?: number,
    take?: number,
  ): Promise<[MonthlyReport[], number]> {
    const user = await this.userService.findUser(email);

    return this.monthlyReportRepository
      .createQueryBuilder('monthlyReport')
      .innerJoinAndSelect(
        'monthlyReport.internshipProcess',
        'internshipProcess',
      )
      .innerJoinAndSelect('internshipProcess.intern', 'intern')
      .where('intern.id = :internId', { internId: user?.intern?.id })
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }

  async getSemesterReportsByInternshipAdvisorId(
    internshipAdvisorId: string | number,
    _order?: OrderClause,
    skip?: number,
    take?: number,
  ) {
    return this.semesterReportRepository
      .createQueryBuilder('semesterReport')
      .innerJoinAndSelect(
        'semesterReport.internshipProcess',
        'internshipProcess',
      )
      .innerJoinAndSelect(
        'internshipProcess.internshipAdvisor',
        'internshipAdvisor',
      )
      .innerJoinAndSelect('internshipProcess.intern', 'intern')
      .where('internshipAdvisor.id = :internshipAdvisorId', {
        internshipAdvisorId,
      })
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }

  async getMonthlyReportsByInternshipAdvisorId(
    internshipAdvisorId: string | number,
    _order?: OrderClause,
    skip?: number,
    take?: number,
  ) {
    return this.monthlyReportRepository
      .createQueryBuilder('monthlyReport')
      .innerJoinAndSelect(
        'monthlyReport.internshipProcess',
        'internshipProcess',
      )
      .innerJoinAndSelect(
        'internshipProcess.internshipAdvisor',
        'internshipAdvisor',
      )
      .innerJoinAndSelect('internshipProcess.intern', 'intern')
      .where('internshipAdvisor.id = :internshipAdvisorId', {
        internshipAdvisorId,
      })
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }
}
