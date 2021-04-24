import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseFilter } from 'src/common/interfaces/base-filter-interface';
import { Raw, Repository } from 'typeorm';
import { CreateInternshipAdvisorDTO } from './dto/create-internship-advisor.dto';
import { InternshipAdvisor } from './internship-advisor.entity';

@Injectable()
export class InternshipAdvisorsService {
  constructor(
    @InjectRepository(InternshipAdvisor)
    private internshipAdvisorRepository: Repository<InternshipAdvisor>,
  ) {}

  findAll(
    order?,
    skip?: number,
    take?: number,
    filter?: BaseFilter,
    campusId?: number,
  ): Promise<[InternshipAdvisor[], number]> {
    const { q } = filter;
    const whereClause = q
      ? { name: Raw(alias => `${alias} ILIKE '%${q}%'`) }
      : null;
    return this.internshipAdvisorRepository.findAndCount({
      order,
      skip,
      take,
      where: { ...whereClause, campus: campusId },
      relations: ['user'],
    });
  }

  create(
    internshipAdvisor: CreateInternshipAdvisorDTO,
    campusId?: number,
  ): Promise<InternshipAdvisor> {
    internshipAdvisor.campus = campusId ? campusId : internshipAdvisor.campus;
    const internshipAdvisorObj = this.internshipAdvisorRepository.create({
      ...internshipAdvisor,
    });
    return this.internshipAdvisorRepository.save(internshipAdvisorObj);
  }
}
