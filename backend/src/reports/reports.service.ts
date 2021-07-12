import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { OrderClause } from 'src/common/interfaces/order-clause.interface';
import { generateDocxFile } from 'src/common/utils';
import { Company } from 'src/companies/company.entity';
import { Course } from 'src/courses/course.entity';
import { Intern } from 'src/interns/intern.entity';
import { InternsService } from 'src/interns/interns.service';
import { InternshipAdvisor } from 'src/internship-advisors/internship-advisor.entity';
import { TasksService } from 'src/tasks/tasks.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateMonthlyReportDTO } from './dto/create-monthly-report.dto';
import { CreateSemesterReportDTO } from './dto/create-semester-report.dto';
import { UpdateMonthlyReportDTO } from './dto/update-monthly-report.dto';
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

  async getSemesterReportById(id: number | string) {
    return this.monthlyReportRepository
      .createQueryBuilder('semesterReport')
      .leftJoinAndSelect('semesterReport.tasks', 'tasks')
      .innerJoinAndSelect(
        'semesterReport.internshipProcess',
        'internshipProcess',
      )
      .where('semesterReport.id = :reportId', { reportId: id })
      .getOne();
  }

  async getMonthlyReportById(id: number | string) {
    return this.monthlyReportRepository
      .createQueryBuilder('monthlyReport')
      .leftJoinAndSelect('monthlyReport.tasks', 'tasks')
      .innerJoinAndSelect(
        'monthlyReport.internshipProcess',
        'internshipProcess',
      )
      .innerJoinAndSelect('internshipProcess.intern', 'intern')
      .innerJoinAndSelect('internshipProcess.company', 'company')
      .innerJoinAndSelect(
        'internshipProcess.internshipAdvisor',
        'internshipAdvisor',
      )
      .innerJoinAndSelect('intern.course', 'course')
      .where('monthlyReport.id = :reportId', { reportId: id })
      .getOne();
  }

  async updateMonthlyReport(
    id: number | string,
    monthlyReport: UpdateMonthlyReportDTO,
  ) {
    await this.monthlyReportRepository.update(id, monthlyReport);
    return this.monthlyReportRepository.findOne(id);
  }

  async generateMonthlyReportFile(id: number | string) {
    const report = await this.getMonthlyReportById(id);
    const internshipProcess = report?.internshipProcess;
    const intern = <Intern>report?.internshipProcess?.intern;
    const company = <Company>report?.internshipProcess?.company;
    const internshipAdvisor = <InternshipAdvisor>(
      report?.internshipProcess?.internshipAdvisor
    );
    const course = <Course>intern?.course;

    return await generateDocxFile(
      {
        intern_name: intern?.name,
        company: company?.name,
        intern_course: course?.name,
        internship_advisor_name: internshipAdvisor?.name,
        internship_supervisor_name: internshipProcess?.supervisor,
        month: dayjs(report?.startDate)?.month() + 1,
        year: dayjs(report?.startDate)?.year(),
        total_hour_amount_month: report?.tasks?.reduce(
          (acc, task) => acc + task.workedHoursAmount,
          0,
        ),
        accumulated_total_hour_amount: 200,
        tasks: report.tasks.map(task => ({
          ...task,
          date: dayjs(task.date).format('DD/MM/YYYY'),
        })),
      },
      'templates/monthly-report.docx',
    );
  }
}
