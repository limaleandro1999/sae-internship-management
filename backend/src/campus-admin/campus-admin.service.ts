import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseFilter } from 'src/common/interfaces/base-filter-interface';
import { Raw, Repository } from 'typeorm';
import { CampusAdmin } from './campus-admin.entity';

@Injectable()
export class CampusAdminService {
  constructor(
    @InjectRepository(CampusAdmin)
    private campusAdminRepository: Repository<CampusAdmin>
  ){}

  findAll(order?: Record<string, unknown>, skip?: number, take?: number, filter?: BaseFilter): Promise<[CampusAdmin[], number]> {
    const { q } = filter;
    const whereClause = q ? { name: Raw(alias => `${alias} ILIKE '%${q}%'`) } : null;
    return this.campusAdminRepository.findAndCount({ order, skip, take, where: whereClause, relations: ['user'] });
  }

  findByConfirmationId(confirmationId: string): Promise<CampusAdmin> {
    return this.campusAdminRepository.findOne({ where: { confirmationId } });
  }

  create(campusAdmin: CampusAdmin): Promise<CampusAdmin> {
    const campusAdminObj = this.campusAdminRepository.create({ ...campusAdmin });
    return this.campusAdminRepository.save(campusAdminObj);
  }
}
