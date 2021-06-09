import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseFilter } from 'src/common/interfaces/base-filter-interface';
import { FindConditions, In, Raw, Repository } from 'typeorm';
import { CreateInternshipAdvisorDTO } from './dto/create-internship-advisor.dto';
import { UpdateInternshipAdvisorDTO } from './dto/update-internship-advisor.dto';
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
    const { q, id } = filter;
    let whereClause: FindConditions<InternshipAdvisor>[] = [
      { campus: campusId },
    ];

    if (q) {
      whereClause = [
        { name: Raw(alias => `${alias} ILIKE '%${q}%'`), campus: campusId },
      ];
    }

    if (id) {
      whereClause = [{ id: In(id) }];
    }

    return this.internshipAdvisorRepository.findAndCount({
      order,
      skip,
      take,
      where: [...whereClause],
      relations: ['user'],
    });
  }

  findOne(id): Promise<InternshipAdvisor> {
    return this.internshipAdvisorRepository.findOne(id);
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

  async update(
    id: number | string,
    internshipAdvisor: UpdateInternshipAdvisorDTO,
  ) {
    await this.internshipAdvisorRepository.update(id, internshipAdvisor);
    return this.findOne(id);
  }
}
