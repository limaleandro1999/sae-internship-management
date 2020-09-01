import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Campus } from './campus.entity';
import { CreateCampusDTO } from './dto/create-campus.dto';
import { UpdateCampusDTO } from './dto/update-campus.dto';

@Injectable()
export class CampiService {
  constructor(
    @InjectRepository(Campus)
    private campiRepository: Repository<Campus>
  ) {}

  findAll(order?: object, skip?: number, take?: number, filter?: object): Promise<[Campus[], number]> {
    return this.campiRepository.findAndCount({ order, skip, take });
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
