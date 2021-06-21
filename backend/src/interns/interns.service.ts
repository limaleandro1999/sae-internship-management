import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import dayjsBusinessDays from 'dayjs-business-days';
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

dayjs.extend(dayjsBusinessDays);

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

  async hasActiveInternshipProcess(
    internId: number | string,
  ): Promise<boolean> {
    const intern = await this.internRepository
      .createQueryBuilder('intern')
      .innerJoinAndSelect('intern.internshipProcesses', 'internshipProcesses')
      .where('intern.id = :id', { id: internId })
      .getOne();

    return intern.internshipProcesses.some(
      internshipProcess =>
        internshipProcess.status === InternshipProcessStatus.ACTIVE,
    );
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

  async update(id: number | string, intern: UpdateInternDTO) {
    await this.internRepository.update(id, intern);
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

  async getInternClasses(email: string) {
    const user = await this.userService.findUser(email);
    const intern = await this.internRepository.findOne(user?.intern?.id, {
      select: ['id', 'classesSchedule'],
    });

    return intern.classesSchedule;
  }

  async getInternTasks(
    email: string,
    skip?: number,
    take?: number,
    filter?: BaseFilter,
  ) {
    const user = await this.userService.findUser(email);
    const {
      internshipProcesses: [{ tasks, startDate, finishDate }],
    } = await this.internRepository
      .createQueryBuilder('intern')
      .innerJoinAndSelect('intern.internshipProcesses', 'internshipProcesses')
      .leftJoinAndSelect('internshipProcesses.tasks', 'tasks')
      .where('internshipProcesses.status = :status AND intern.id = :id', {
        status: InternshipProcessStatus.ACTIVE,
        id: user?.intern?.id,
      })
      .getOne();

    const internshipStartDate = dayjs(startDate);
    const internshipFinishDate = dayjs(finishDate);
    const month = filter?.date ?? dayjs();
    const businessDaysInCurrentMonth: dayjs.Dayjs[] = dayjs(month)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      .businessDaysInMonth()
      .filter(
        (dayOfMonth: dayjs.Dayjs) =>
          dayOfMonth >= internshipStartDate &&
          dayOfMonth <= internshipFinishDate,
      );
    const startIndex = skip;
    const endIndex = startIndex + take;

    return [
      businessDaysInCurrentMonth
        .map((date, index) => {
          const [task] = tasks.filter(
            ({ date: taskDate, delivered }) =>
              delivered && dayjs(taskDate).diff(date, 'days') === 0,
          );

          /**
           * Need to send the index as id to "solve" a bug with react admin
           */
          if (task) {
            return {
              ...task,
              date: dayjs(task.date),
              deliveredDate: dayjs(task.deliveredDate),
              id: index,
              realId: task.id,
            };
          }

          return {
            id: index,
            delivered: false,
            date,
          };
        })
        .slice(startIndex, endIndex),
      businessDaysInCurrentMonth.length,
    ];
  }
}
