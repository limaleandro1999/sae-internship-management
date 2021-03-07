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

  findAll(order?: Record<string, unknown>, skip?: number, take?: number, filter?: BaseFilter, campusId?: number): Promise<[CampusAdmin[], number]> {
    const { q } = filter;
    const whereClause = q ? { name: Raw(alias => `${alias} ILIKE '%${q}%'`) } : null;
    return this.campusAdminRepository.findAndCount({ order, skip, take, where: {  ...whereClause, campus: campusId }, relations: ['user'] });
  }

  findByConfirmationId(confirmationId: string): Promise<CampusAdmin> {
    return this.campusAdminRepository.findOne({ where: { confirmationId } });
  }

  create(campusAdmin: CampusAdmin, campusId?: number): Promise<CampusAdmin> {
    campusAdmin.campus = campusId ? campusId : campusAdmin.campus;
    const campusAdminObj = this.campusAdminRepository.create({ ...campusAdmin });
    return this.campusAdminRepository.save(campusAdminObj);
  }
}
