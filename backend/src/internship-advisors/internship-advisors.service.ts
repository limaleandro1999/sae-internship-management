import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseFilter } from 'src/common/interfaces/base-filter-interface';
import { OrderClause } from 'src/common/interfaces/order-clause.interface';
import { Repository } from 'typeorm';
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
    order?: OrderClause,
    skip?: number,
    take?: number,
    filter?: BaseFilter,
    campusId?: number,
  ): Promise<[InternshipAdvisor[], number]> {
    const { q, id } = filter;
    let whereClause = { where: {}, parameters: {} };
    const orderByClause = {
      column: `internshipAdvisor.${Object.keys(order)[0]}`,
      order: Object.values(order)[0],
    };

    if (q) {
      whereClause = {
        where:
          '(internshipAdvisor.name ILIKE :name OR internshipAdvisor.siape ILIKE :siape) AND internshipAdvisor.campusId = :campusId',
        parameters: { name: `${q}%`, siape: `${q}%`, campusId },
      };
    }

    if (id) {
      whereClause = {
        where: 'internshipAdvisor.id IN (:...ids)',
        parameters: { ids: id },
      };
    }

    return this.internshipAdvisorRepository
      .createQueryBuilder('internshipAdvisor')
      .innerJoinAndSelect('internshipAdvisor.user', 'user')
      .where(whereClause.where, whereClause.parameters)
      .orderBy(orderByClause.column, orderByClause.order)
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }

  findOne(id): Promise<InternshipAdvisor> {
    return this.internshipAdvisorRepository.findOne(id, {
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

  async update(
    id: number | string,
    internshipAdvisor: UpdateInternshipAdvisorDTO,
  ) {
    await this.internshipAdvisorRepository.update(id, internshipAdvisor);
    return this.findOne(id);
  }
}
