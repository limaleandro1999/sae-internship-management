import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSemesterReportDTO } from './dto/create-semester-report.dto';
import { SemesterReport } from './semester-report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(SemesterReport)
    private semesterReportRepository: Repository<SemesterReport>,
  ) {}

  create(semesterReport: CreateSemesterReportDTO): Promise<SemesterReport> {
    return this.semesterReportRepository.save(semesterReport);
  }
}
