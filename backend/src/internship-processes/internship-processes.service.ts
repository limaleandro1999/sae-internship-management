import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { BaseFilter } from 'src/common/interfaces/base-filter-interface';
import { OrderClause } from 'src/common/interfaces/order-clause.interface';
import { CompaniesService } from 'src/companies/companies.service';
import { Company } from 'src/companies/company.entity';
import { EmailsService } from 'src/emails/emails.service';
import { Intern } from 'src/interns/intern.entity';
import { InternsService } from 'src/interns/interns.service';
import { InternshipAdvisorsService } from 'src/internship-advisors/internship-advisors.service';
import { ReportsService } from 'src/reports/reports.service';
import { SemesterReport } from 'src/reports/semester-report.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { AdditiveTerm } from './additive-term.entity';
import { AdditivateInternshipProcessDTO } from './dto/addivate-internship-process.dto';
import { CreateInternshipProcessDTO } from './dto/create-interniship-process.dto';
import { FinishInternshipProcessDTO } from './dto/finish-internship-process.dto';
import {
  InternshipProcess,
  InternshipProcessStatus,
} from './internship-process.entity';
@Injectable()
export class InternshipProcessesService {
  constructor(
    @InjectRepository(InternshipProcess)
    private internshipProcessesRepository: Repository<InternshipProcess>,
    @InjectRepository(AdditiveTerm)
    private additiveTermRepository: Repository<AdditiveTerm>,
    private readonly companiesService: CompaniesService,
    private readonly internsService: InternsService,
    @Inject(forwardRef(() => InternshipAdvisorsService))
    private readonly internshipAdvisorService: InternshipAdvisorsService,
    private readonly reportsService: ReportsService,
    private readonly emailService: EmailsService,
  ) {}

  findAll(
    order?: OrderClause,
    skip?: number,
    take?: number,
    filter?: BaseFilter,
    campusId?: number,
  ): Promise<[InternshipProcess[], number]> {
    const { q } = filter;

    // TO-DO: Find a better way to do that
    const orderByClause = {
      column: `internship.${Object.keys(order)[0]}`,
      order: Object.values(order)[0],
    };
    const whereClause = q
      ? {
          where:
            '(intern.name ILIKE :name OR intern.registrationNumber ILIKE :registraionNumber) AND internship.campusId = :campusId',
          parameters: { name: `${q}%`, registraionNumber: `${q}%`, campusId },
        }
      : {
          where: 'internship.campusId = :campusId',
          parameters: { campusId },
        };

    return this.internshipProcessesRepository
      .createQueryBuilder('internship')
      .innerJoinAndSelect('internship.intern', 'intern')
      .innerJoinAndSelect('internship.company', 'company')
      .innerJoinAndSelect('internship.internshipAdvisor', 'internshipAdvisor')
      .where(whereClause.where, whereClause.parameters)
      .orderBy(orderByClause.column, orderByClause.order)
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }

  findOne(id: number | string): Promise<InternshipProcess> {
    return this.internshipProcessesRepository
      .createQueryBuilder('internship')
      .innerJoinAndSelect('internship.intern', 'intern')
      .innerJoinAndSelect('intern.user', 'user')
      .innerJoinAndSelect('internship.company', 'company')
      .innerJoinAndSelect('internship.internshipAdvisor', 'internshipAdvisor')
      .leftJoinAndSelect('internship.semesterReports', 'semesterReports')
      .leftJoinAndSelect('internship.monthlyReports', 'monthlyReports')
      .orderBy({ 'semesterReports.startDate': 'ASC' })
      .where('internship.id = :id', { id })
      .getOne();
  }

  async createSemesterReports(
    internshipProcessId: number,
    startDate: Date,
    finishDate: Date,
  ) {
    const parsedStartDate = dayjs(startDate);
    const parsedFinishtDate = dayjs(finishDate);
    const monthDiff = dayjs(parsedFinishtDate).diff(parsedStartDate, 'months');
    const numberOfReports = Math.floor(monthDiff / 6);
    const generatedReports: SemesterReport[] = [];

    let lastStartDate = parsedStartDate;
    let lastFinishDate = dayjs(lastStartDate)
      .add(6, 'months')
      .subtract(1, 'day');

    async function* asyncGenerator() {
      let i = 0;
      while (i < numberOfReports) {
        yield i++;
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for await (const _ of asyncGenerator()) {
      const report = await this.reportsService.create({
        deadline: lastFinishDate.add(1, 'month').toDate(),
        finishDate: lastFinishDate.toDate(),
        startDate: lastStartDate.toDate(),
        delivered: false,
        internshipProcess: internshipProcessId,
      });

      generatedReports.push(report);

      lastStartDate = dayjs(lastFinishDate).add(1, 'day');
      lastFinishDate = dayjs(lastStartDate)
        .add(6, 'months')
        .subtract(1, 'day');
    }

    return generatedReports;
  }

  async create(
    internshipProcess: CreateInternshipProcessDTO,
    campusId?: number,
  ): Promise<InternshipProcess> {
    let company: Company;
    let intern: Intern;

    if (
      typeof internshipProcess.intern !== 'number' &&
      typeof internshipProcess.intern !== 'string'
    ) {
      intern = await this.internsService.create(
        internshipProcess.intern,
        campusId,
      );
    } else {
      const hasActiveInternshipProcess = await this.internsService.hasActiveInternshipProcess(
        internshipProcess.intern,
      );

      if (hasActiveInternshipProcess) {
        throw new Error('Intern has active Internship');
      }

      intern = await this.internsService.findOne(internshipProcess.intern);
    }

    if (
      typeof internshipProcess.company !== 'number' &&
      typeof internshipProcess.company !== 'string'
    ) {
      company = await this.companiesService.create(
        internshipProcess.company,
        campusId,
      );
    }

    const internshipProcessObj = this.internshipProcessesRepository.create({
      ...internshipProcess,
      company: company ?? internshipProcess.company,
      intern: intern ?? internshipProcess.intern,
      campus: campusId,
    });

    const createdInternshipProcess = await this.internshipProcessesRepository.save(
      internshipProcessObj,
    );
    const generatedReports = await this.createSemesterReports(
      createdInternshipProcess.id,
      createdInternshipProcess.startDate,
      createdInternshipProcess.finishDate,
    );

    try {
      const internshipAdvisor = await this.internshipAdvisorService.findOne(
        createdInternshipProcess?.internshipAdvisor,
      );

      await this.emailService.sendStartInternshipProcessNotification({
        internName: intern?.name,
        isMandatory: createdInternshipProcess?.mandatory,
        startDate: dayjs(createdInternshipProcess?.startDate).format(
          'DD/MM/YYYY',
        ),
        to: (<User>internshipAdvisor?.user).email,
        name: internshipAdvisor?.name,
      });
    } catch (error) {
      console.error(error);
    }

    return { ...createdInternshipProcess, semesterReports: generatedReports };
  }

  // TO-DO: Add checks for tasks and reports
  async finishInternshipProcess(
    id: number | string,
    finishInternshipProcessDTO: FinishInternshipProcessDTO,
  ): Promise<InternshipProcess> {
    const result = await this.internshipProcessesRepository.update(id, {
      status: InternshipProcessStatus.FINISHED,
      ...finishInternshipProcessDTO,
    });

    if (result.affected) {
      return this.internshipProcessesRepository.findOne(id);
    }

    return null;
  }

  getInternshipProcessesByInternshipAdvisorId(
    id: string | number,
    _order?: OrderClause,
    skip?: number,
    take?: number,
  ) {
    return this.internshipProcessesRepository
      .createQueryBuilder('internship')
      .innerJoinAndSelect('internship.intern', 'intern')
      .innerJoinAndSelect('intern.user', 'user')
      .innerJoinAndSelect('internship.company', 'company')
      .innerJoinAndSelect('internship.internshipAdvisor', 'internshipAdvisor')
      .where('internshipAdvisor.id = :id AND internship.status = :status', {
        id,
        status: InternshipProcessStatus.ACTIVE,
      })
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }

  async additivateInternshipProcess(
    id: number | string,
    additivateInternshipProcessDTO: AdditivateInternshipProcessDTO,
  ) {
    let internshipProcess = await this.findOne(id);
    const newFinishDateMonthDiff = dayjs(
      additivateInternshipProcessDTO.finishDate,
    ).diff(dayjs(internshipProcess.finishDate), 'month');
    const lastSemesterReport =
      internshipProcess.semesterReports[
        internshipProcess.semesterReports.length - 1
      ];

    if (newFinishDateMonthDiff <= 6) {
      if (lastSemesterReport) {
        lastSemesterReport.finishDate =
          additivateInternshipProcessDTO.finishDate;
      }
    } else {
      if (lastSemesterReport) {
        lastSemesterReport.finishDate = dayjs(lastSemesterReport.startDate)
          .add(6, 'month')
          .toDate();
      }

      await this.createSemesterReports(
        internshipProcess.id,
        dayjs(lastSemesterReport?.finishDate)
          .add(1, 'day')
          .toDate() ?? internshipProcess.startDate,
        additivateInternshipProcessDTO.finishDate,
      );
    }

    if (lastSemesterReport) {
      await this.reportsService.updateSemesterReport(
        lastSemesterReport.id,
        lastSemesterReport,
      );
    }

    const createdAdditiveTerm = await this.additiveTermRepository.save({
      previousFinishDate: internshipProcess.finishDate,
      newFinishDate: additivateInternshipProcessDTO.finishDate,
      internshipProcess: internshipProcess.id,
      timeAdditiveTermFileURL:
        additivateInternshipProcessDTO.timeAdditiveTermFileURL,
    });

    await this.internshipProcessesRepository.update(internshipProcess.id, {
      finishDate: additivateInternshipProcessDTO.finishDate,
    });
    internshipProcess = await this.findOne(id);

    return { ...internshipProcess, createdAdditiveTerm };
  }
}
