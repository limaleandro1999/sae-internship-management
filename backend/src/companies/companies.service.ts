import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Raw } from 'typeorm';

import { Company } from './company.entity';
import { CreateCompanyDTO } from './dto/create-company.dto';
import { UpdateCompanyDTO } from './dto/update-company.dto';
import { BaseFilter } from 'src/common/interfaces/base-filter-interface';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companiesRepository: Repository<Company>,
  ) {}

  findAll(
    order?,
    skip?: number,
    take?: number,
    filter?: BaseFilter,
    campusId?: number,
  ): Promise<[Company[], number]> {
    const { q } = filter;
    const whereClause = q
      ? { name: Raw(alias => `${alias} ILIKE '%${q}%'`) }
      : null;
    return this.companiesRepository.findAndCount({
      order,
      skip,
      take,
      where: { ...whereClause, campus: campusId },
    });
  }

  findOne(id: number | string): Promise<Company> {
    return this.companiesRepository.findOne(id);
  }

  create(company: CreateCompanyDTO, campusId?: number): Promise<Company> {
    company.campus = campusId ? campusId : company.campus;
    return this.companiesRepository.save(company);
  }

  async update(
    id: number | string,
    company: UpdateCompanyDTO,
  ): Promise<Company> {
    await this.companiesRepository.update(id, company);
    return this.companiesRepository.findOne(id);
  }
}
