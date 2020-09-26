import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 } from 'uuid';

import { BaseFilter } from 'src/common/interfaces/base-filter-interface';
import { Raw, Repository } from 'typeorm';
import { CampusAdmin } from './campus-admin.entity';
import { CreateCampusAdminDTO } from './dto/create-campus-admin.dto';

@Injectable()
export class CampusAdminService {
  constructor(
    @InjectRepository(CampusAdmin)
    private campusAdminRepository: Repository<CampusAdmin>
  ){}

  findAll(order?: object, skip?: number, take?: number, filter?: BaseFilter): Promise<[CampusAdmin[], number]> {
    const { q } = filter;
    const whereClause = q ? { name: Raw(alias => `${alias} ILIKE '%${q}%'`) } : null;
    return this.campusAdminRepository.findAndCount({ order, skip, take, where: whereClause });
  }

  findByConfirmationId(confirmationId: string): Promise<CampusAdmin> {
    return this.campusAdminRepository.findOne({ where: { confirmationId } });
  }

  create(campusAdmin: CreateCampusAdminDTO): Promise<CampusAdmin> {
    const campusAdminObj = this.campusAdminRepository.create({ ...campusAdmin, confirmationId: v4() });
    return this.campusAdminRepository.save(campusAdminObj);
  }
}
