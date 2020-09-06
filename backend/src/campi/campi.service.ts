import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Raw } from 'typeorm';

import { Campus } from './campus.entity';
import { CreateCampusDTO } from './dto/create-campus.dto';
import { UpdateCampusDTO } from './dto/update-campus.dto';
import { BaseFilter } from 'src/common/interfaces/base-filter-interface';

@Injectable()
export class CampiService {
  constructor(
    @InjectRepository(Campus)
    private campiRepository: Repository<Campus>
  ) {}

  findAll(order?: object, skip?: number, take?: number, filter?: BaseFilter): Promise<[Campus[], number]> {
    const { q } = filter;
    const whereClause = q ? { name: Raw(alias => `${alias} ILIKE '%${q}%'`) } : null;
    return this.campiRepository.findAndCount({ order, skip, take, where: whereClause });
  }

  findOne(id: number | string): Promise<Campus> {
    return this.campiRepository.findOne(id);
  }

  create(campus: CreateCampusDTO): Promise<Campus> {
    return this.campiRepository.save(campus);
  }

  async update(id: number | string, campus: UpdateCampusDTO): Promise<Campus> {
    await this.campiRepository.update(id, campus);
    return this.campiRepository.findOne(id);
  }
}
