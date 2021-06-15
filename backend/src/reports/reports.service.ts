import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SemesterReport } from './semester-report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(SemesterReport)
    private internRepository: Repository<SemesterReport>,
  ) {}
}
