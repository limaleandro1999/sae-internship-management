import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseFilter } from 'src/common/interfaces/base-filter-interface';
import { CompaniesService } from 'src/companies/companies.service';
import { Company } from 'src/companies/company.entity';
import { Intern } from 'src/interns/intern.entity';
import { InternsService } from 'src/interns/interns.service';
import { Repository } from 'typeorm';
import { CreateInternshipProcessDTO } from './dto/create-interniship-process.dto';
import { InternshipProcess } from './internship-process.entity';

@Injectable()
export class InternshipProcessesService {
  constructor(
    @InjectRepository(InternshipProcess)
    private internshipProcessesRepository: Repository<InternshipProcess>,
    private readonly companiesService: CompaniesService,
    private readonly internsService: InternsService,
  ) {}

  async findAll(
    order?,
    skip?: number,
    take?: number,
    filter?: BaseFilter,
    campusId?: number,
  ): Promise<[InternshipProcess[], number]> {
    const { q } = filter;
    const whereClause = q
      ? {
          where:
            '(intern.name ILIKE :name OR intern.registrationNumber ILIKE :registraionNumber) AND internship.campusId = :campusId',
          parameters: { name: q, registraionNumber: q, campusId },
        }
      : {
          where: 'internship.campusId = :campusId',
          parameters: { campusId },
        };

    return await this.internshipProcessesRepository
      .createQueryBuilder('internship')
      .innerJoinAndSelect('internship.intern', 'intern')
      .where(whereClause.where, whereClause.parameters)
      .orderBy('internship.id', 'ASC')
      .skip(skip)
      .take(take)
      .loadAllRelationIds()
      .getManyAndCount();
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
}
