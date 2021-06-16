import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateSemesterReportDTO } from './dto/create-semester-report.dto';
import { SemesterReport } from './semester-report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(SemesterReport)
    private semesterReportRepository: Repository<SemesterReport>,
    private readonly userService: UsersService,
  ) {}

  create(semesterReport: CreateSemesterReportDTO): Promise<SemesterReport> {
    return this.semesterReportRepository.save(semesterReport);
  }

  async getInternReports(
    email: string,
    skip?: number,
    take?: number,
  ): Promise<[SemesterReport[], number]> {
    const user = await this.userService.findUser(email);

    return this.semesterReportRepository
      .createQueryBuilder('semesterReport')
      .innerJoinAndSelect(
        'semesterReport.internshipProcess',
        'internshipProcess',
      )
      .innerJoinAndSelect('internshipProcess.intern', 'intern')
      .where('intern.id = :userId', { userId: user?.intern?.id })
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }
}
