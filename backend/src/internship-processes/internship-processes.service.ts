import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseFilter } from 'src/common/interfaces/base-filter-interface';
import { OrderClause } from 'src/common/interfaces/order-clause.interface';
import { CompaniesService } from 'src/companies/companies.service';
import { Company } from 'src/companies/company.entity';
import { Intern } from 'src/interns/intern.entity';
import { InternsService } from 'src/interns/interns.service';
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
      .innerJoinAndSelect('internship.company', 'company')
      .innerJoinAndSelect('internship.internshipAdvisor', 'internshipAdvisor')
      .where('internship.id = :id', { id })
      .getOne();
  }

  async create(
    internshipProcess: CreateInternshipProcessDTO,
    campusId?: number,
  ): Promise<InternshipProcess> {
    let company: Company;
    let intern: Intern;

    if (typeof internshipProcess.company !== 'number') {
      company = await this.companiesService.create(
        internshipProcess.company,
        campusId,
      );
    }

    if (typeof internshipProcess.intern !== 'number') {
      intern = await this.internsService.create(
        internshipProcess.intern,
        campusId,
      );
    }

    const internshipProcessObj = this.internshipProcessesRepository.create({
      ...internshipProcess,
      company: company ?? internshipProcess.company,
      intern: intern ?? internshipProcess.intern,
      campus: campusId,
    });

    return this.internshipProcessesRepository.save(internshipProcessObj);
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
}
