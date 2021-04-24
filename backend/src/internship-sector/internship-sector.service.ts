import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseFilter } from 'src/common/interfaces/base-filter-interface';
import { Raw, Repository } from 'typeorm';
import { InternshipSector } from './internship-sector.entity';

@Injectable()
export class InternshipSectorService {
  constructor(
    @InjectRepository(InternshipSector)
    private internshipSectorRepository: Repository<InternshipSector>,
  ) {}

  findAll(
    order?,
    skip?: number,
    take?: number,
    filter?: BaseFilter,
    campusId?: number,
  ): Promise<[InternshipSector[], number]> {
    const { q } = filter;
    const whereClause = q
      ? { name: Raw(alias => `${alias} ILIKE '%${q}%'`) }
      : null;
    return this.internshipSectorRepository.findAndCount({
      order,
      skip,
      take,
      where: { ...whereClause, campus: campusId },
      relations: ['user'],
    });
  }

  create(
    internshipSector: InternshipSector,
    campusId?: number,
  ): Promise<InternshipSector> {
    internshipSector.campus = campusId ? campusId : internshipSector.campus;
    const internshipSectorObj = this.internshipSectorRepository.create({
      ...internshipSector,
    });
    return this.internshipSectorRepository.save(internshipSectorObj);
  }
}
