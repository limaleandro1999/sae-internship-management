import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseFilter } from 'src/common/interfaces/base-filter-interface';
import { Raw, Repository } from 'typeorm';
import { CreateInternDTO } from './dto/create-intern.dto';
import { UpdateInternDTO } from './dto/update-intern.dto';
import { Intern } from './intern.entity';

@Injectable()
export class InternsService {
  constructor(
    @InjectRepository(Intern)
    private internRepository: Repository<Intern>,
  ) {}

  findAll(
    order?,
    skip?: number,
    take?: number,
    filter?: BaseFilter,
    campusId?: number,
  ): Promise<[Intern[], number]> {
    const { q } = filter;
    const whereClause = q
      ? { name: Raw(alias => `${alias} ILIKE '%${q}%'`) }
      : null;
    return this.internRepository.findAndCount({
      order,
      skip,
      take,
      where: { ...whereClause, campus: campusId },
      relations: ['user'],
    });
  }

  findOne(id): Promise<Intern> {
    return this.internRepository.findOne(id);
  }

  create(
    internshipAdvisor: CreateInternDTO,
    campusId?: number,
  ): Promise<Intern> {
    internshipAdvisor.campus = campusId ? campusId : internshipAdvisor.campus;
    const internshipAdvisorObj = this.internRepository.create({
      ...internshipAdvisor,
    });
    return this.internRepository.save(internshipAdvisorObj);
  }

  async update(id: number | string, internshipAdvisor: UpdateInternDTO) {
    await this.internRepository.update(id, internshipAdvisor);
    return this.findOne(id);
  }
}
