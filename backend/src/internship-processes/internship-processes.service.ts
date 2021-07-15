import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { BaseFilter } from 'src/common/interfaces/base-filter-interface';
import { OrderClause } from 'src/common/interfaces/order-clause.interface';
import { CompaniesService } from 'src/companies/companies.service';
import { Company } from 'src/companies/company.entity';
import { Intern } from 'src/interns/intern.entity';
import { InternsService } from 'src/interns/interns.service';
import { ReportsService } from 'src/reports/reports.service';
import { SemesterReport } from 'src/reports/semester-report.entity';
import { Repository } from 'typeorm';
import { CreateInternshipProcessDTO } from './dto/create-interniship-process.dto';
import {
  InternshipProcess,
  InternshipProcessStatus,
} from './internship-process.entity';
@Injectable()
export class InternshipProcessesService {
  constructor(
    @InjectRepository(InternshipProcess)
    private internshipProcessesRepository: Repository<InternshipProcess>,
    private readonly companiesService: CompaniesService,
    private readonly internsService: InternsService,
    private readonly reportsService: ReportsService,
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
      .where('internship.id = :id', { id })
      .getOne();
  }

  async createSemesterReports(internshipProcess: InternshipProcess) {
    const { startDate, finishDate } = internshipProcess;
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
        internshipProcess: internshipProcess.id,
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

    if (typeof internshipProcess.intern !== 'number') {
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
    }

    if (typeof internshipProcess.company !== 'number') {
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
      createdInternshipProcess,
    );

    return { ...createdInternshipProcess, semesterReports: generatedReports };
  }

  // TO-DO: Add checks for tasks and reports
  async finishInternshipProcess(
    id: number | string,
  ): Promise<InternshipProcess> {
    const result = await this.internshipProcessesRepository.update(id, {
      status: InternshipProcessStatus.FINISHED,
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
    _filter?: BaseFilter,
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
}
