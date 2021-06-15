import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import environment from 'src/common/environment';
import { BaseFilter } from 'src/common/interfaces/base-filter-interface';
import { EmailsService } from 'src/emails/emails.service';
import { InternshipProcessStatus } from 'src/internship-processes/internship-process.entity';
import { UserType } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { FindConditions, In, Raw, Repository } from 'typeorm';
import { CreateInternDTO } from './dto/create-intern.dto';
import { UpdateInternDTO } from './dto/update-intern.dto';
import { Intern } from './intern.entity';

@Injectable()
export class InternsService {
  constructor(
    @InjectRepository(Intern)
    private internRepository: Repository<Intern>,
    private readonly userService: UsersService,
    private readonly emailService: EmailsService,
  ) {}

  findAll(
    order?,
    skip?: number,
    take?: number,
    filter?: BaseFilter,
    campusId?: number,
  ): Promise<[Intern[], number]> {
    const { q, id } = filter;
    let whereClause: FindConditions<Intern>[] = [{ campus: campusId }];

    if (q) {
      whereClause = [
        { name: Raw(alias => `${alias} ILIKE '%${q}%'`), campus: campusId },
        {
          registrationNumber: Raw(alias => `${alias} ILIKE '%${q}%'`),
          campus: campusId,
        },
      ];
    }

    if (id) {
      whereClause = [{ id: In(id) }];
    }

    return this.internRepository.findAndCount({
      order,
      skip,
      take,
      where: [...whereClause],
      relations: ['user'],
    });
  }

  findOne(id): Promise<Intern> {
    return this.internRepository.findOne(id);
  }

  async create(intern: CreateInternDTO, campusId?: number): Promise<Intern> {
    const internUser = await this.userService.create({
      email: intern.email,
      type: UserType.INTERN,
      active: false,
    });

    intern.campus = campusId ? campusId : intern.campus;
    const internshipAdvisorObj = this.internRepository.create({
      ...intern,
      user: internUser,
    });

    const createdIntern = await this.internRepository.save(
      internshipAdvisorObj,
    );

    await this.emailService.sendConfirmationEmail({
      to: internUser.email,
      name: createdIntern.name,
      confirmationLink: `${environment().links.accountConfimationPrefixLink}${
        internUser.confirmationId
      }`,
    });

    return createdIntern;
  }

  async update(id: number | string, internshipAdvisor: UpdateInternDTO) {
    await this.internRepository.update(id, internshipAdvisor);
    return this.findOne(id);
  }

  async getInternInfo(email: string) {
    const user = await this.userService.findUser(email);

    return this.internRepository
      .createQueryBuilder('intern')
      .innerJoinAndSelect('intern.internshipProcesses', 'internshipProcesses')
      .innerJoinAndSelect('internshipProcesses.company', 'company')
      .innerJoinAndSelect(
        'internshipProcesses.internshipAdvisor',
        'internshipAdvisor',
      )
      .innerJoinAndSelect('internshipAdvisor.user', 'internshipAdvisorUser')
      .innerJoinAndSelect(
        'internshipProcesses.semesterReports',
        'semesterReports',
      )
      .where('internshipProcesses.status = :status AND intern.id = :id', {
        status: InternshipProcessStatus.ACTIVE,
        id: user?.intern?.id,
      })
      .getOne();
  }
}
