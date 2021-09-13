import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import environment from 'src/common/environment';
import { OrderClause } from 'src/common/interfaces/order-clause.interface';
import { generateDocxFile } from 'src/common/utils';
import { Company } from 'src/companies/company.entity';
import { Course } from 'src/courses/course.entity';
import { EmailsService } from 'src/emails/emails.service';
import { Intern } from 'src/interns/intern.entity';
import { InternsService } from 'src/interns/interns.service';
import { InternshipAdvisor } from 'src/internship-advisors/internship-advisor.entity';
import { InternshipProcess } from 'src/internship-processes/internship-process.entity';
import { TasksService } from 'src/tasks/tasks.service';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateMonthlyReportDTO } from './dto/create-monthly-report.dto';
import { CreateSemesterReportDTO } from './dto/create-semester-report.dto';
import { UpdateMonthlyReportDTO } from './dto/update-monthly-report.dto';
import { UpdateSemesterReportDTO } from './dto/update-semester-report.dto';
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
    private readonly emailService: EmailsService,
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
    const startDate = dayjs()
      .set('date', 1)
      .set('month', month - 1)
      .set('year', year)
      .toDate();
    const finishDate = dayjs(startDate)
      .add(1, 'month')
      .subtract(1, 'day')
      .set('hour', 23)
      .set('minute', 59)
      .set('second', 59)
      .toDate();
    const deadline = dayjs(finishDate)
      .add(1, 'month')
      .toDate();
    const monthlyReport = await this.monthlyReportRepository.findOne({
      startDate,
      finishDate,
      internshipProcess,
    });
    const tasks = await this.tasksService.getTasksByDateRangeAndEmail(
      internshipProcess.id,
      startDate,
      finishDate,
    );

    return !monthlyReport
      ? this.monthlyReportRepository.save({
          startDate,
          finishDate,
          deadline,
          internshipProcess,
          tasks,
        })
      : this.monthlyReportRepository.save({ ...monthlyReport, tasks });
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
    return this.semesterReportRepository
      .createQueryBuilder('semesterReport')
      .innerJoinAndSelect(
        'semesterReport.internshipProcess',
        'internshipProcess',
      )
      .innerJoinAndSelect('internshipProcess.intern', 'intern')
      .innerJoinAndSelect('internshipProcess.company', 'company')
      .innerJoinAndSelect(
        'internshipProcess.internshipAdvisor',
        'internshipAdvisor',
      )
      .innerJoinAndSelect('internshipAdvisor.user', 'internshipAdvisorUser')
      .innerJoinAndSelect('intern.course', 'course')
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
    try {
      const monthlyReportObj = await this.getMonthlyReportById(id);
      const internshipProcess = <InternshipProcess>(
        monthlyReportObj?.internshipProcess
      );
      const intern = <Intern>internshipProcess?.intern;
      const internshipAdvisor = <InternshipAdvisor>(
        internshipProcess?.internshipAdvisor
      );

      await this.emailService.sendMonthlyReportDeliveredNotification({
        internName: intern?.name,
        deliveredDate: dayjs(monthlyReport.deliveredDate).format('DD/MM/YYYY'),
        month: dayjs(monthlyReportObj.startDate).format('MM/YYYY'),
        name: (<InternshipAdvisor>internshipProcess?.internshipAdvisor)?.name,
        to: (<User>internshipAdvisor?.user)?.email,
      });
    } catch (error) {
      console.error(error);
    }
    return this.monthlyReportRepository.findOne(id);
  }

  async updateSemesterReport(
    id: number | string,
    semesterReport: UpdateSemesterReportDTO,
  ) {
    await this.semesterReportRepository.update(id, semesterReport);
    try {
      const semesterReportObj = await this.getSemesterReportById(id);
      const internshipProcess = <InternshipProcess>(
        semesterReportObj?.internshipProcess
      );
      const intern = <Intern>internshipProcess?.intern;
      const internshipAdvisor = <InternshipAdvisor>(
        internshipProcess?.internshipAdvisor
      );

      await this.emailService.sendSemesterReportDeliveredNotification({
        internName: intern?.name,
        deliveredDate: dayjs(semesterReport.deliveredDate).format('DD/MM/YYYY'),
        startDate: dayjs(semesterReportObj.startDate).format('DD/MM/YYYY'),
        finishDate: dayjs(semesterReportObj.finishDate).format('DD/MM/YYYY'),
        name: (<InternshipAdvisor>internshipProcess?.internshipAdvisor)?.name,
        to: (<User>internshipAdvisor?.user)?.email,
      });
    } catch (error) {
      console.error(error);
    }
    return this.semesterReportRepository.findOne(id);
  }

  async generateMonthlyReportFile(id: number | string) {
    const report = await this.getMonthlyReportById(id);
    const internshipProcess = report?.internshipProcess;
    const intern = <Intern>internshipProcess.intern;
    const company = <Company>internshipProcess.company;
    const internshipAdvisor = <InternshipAdvisor>(
      internshipProcess.internshipAdvisor
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
        tasks: report.tasks
          .sort((taskA, taskB) =>
            dayjs(taskA.date).isAfter(dayjs(taskB.date)) ? 1 : -1,
          )
          .map(task => ({
            ...task,
            date: dayjs(task.date).format('DD/MM/YYYY'),
          })),
      },
      'templates/monthly-report.docx',
    );
  }

  async generateSemesterReportFile(id: number | string) {
    const report = await this.getSemesterReportById(id);
    const internshipProcess = <InternshipProcess>report?.internshipProcess;
    const intern = <Intern>internshipProcess.intern;
    const company = <Company>internshipProcess.company;
    const internshipAdvisor = <InternshipAdvisor>(
      internshipProcess.internshipAdvisor
    );
    const course = <Course>intern?.course;

    return await generateDocxFile(
      {
        intern_name: intern?.name,
        company: company?.name,
        intern_course: course?.name,
        intern_registration_number: intern?.registrationNumber,
        internship_advisor_name: internshipAdvisor?.name,
        internship_supervisor_name: internshipProcess?.supervisor,
        start_date: dayjs(report.startDate).format('DD/MM/YYYY'),
        finish_date: dayjs(report.finishDate).format('DD/MM/YYYY'),
      },
      'templates/semester-report.docx',
    );
  }

  getReportDownloadLink(report: SemesterReport | MonthlyReport) {
    const reportType =
      report instanceof SemesterReport ? 'semester' : 'monthly';
    let downloadLink;

    if (report.reportFileUrl) {
      downloadLink = `${environment().server.protocol}://${
        environment().server.host
      }/interns/${reportType}-reports/${report.id}/report-file`;
    } else {
      downloadLink = null;
    }

    return downloadLink;
  }
}
