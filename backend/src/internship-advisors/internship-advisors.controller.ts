import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';

import { RequestWithQueryInfo } from 'src/common/interfaces/request-query-info.interface';
import { EmailsService } from 'src/emails/emails.service';
import { UserType } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { CreateInternshipAdvisorDTO } from './dto/create-internship-advisor.dto';
import { UpdateInternshipAdvisorDTO } from './dto/update-internship-advisor.dto';
import { InternshipAdvisor } from './internship-advisor.entity';
import { InternshipAdvisorsService } from './internship-advisors.service';

import environment from 'src/common/environment';

@Controller('internship-advisors')
export class InternshipAdvisorsController {
  constructor(
    private readonly internshipAdvisorService: InternshipAdvisorsService,
    private readonly userService: UsersService,
    private readonly emailService: EmailsService,
  ) {}

  @Get()
  findAll(
    @Req() req: RequestWithQueryInfo,
  ): Promise<[InternshipAdvisor[], number]> {
    const { order, skip, filter, take } = req.queryInfo;
    return this.internshipAdvisorService.findAll(
      order,
      skip,
      take,
      filter,
      req.user.campusId,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<InternshipAdvisor> {
    return this.internshipAdvisorService.findOne(id);
  }

  @Post()
  async create(
    @Req() req: RequestWithQueryInfo,
    @Body() createInternshipAdvisorDTO: CreateInternshipAdvisorDTO,
  ): Promise<InternshipAdvisor> {
    const internshipAdvisorUser = await this.userService.create({
      email: createInternshipAdvisorDTO.email,
      type: UserType.INTERNSHIP_ADVISOR,
      active: false,
    });
    const internshipAdvisor = await this.internshipAdvisorService.create(
      {
        ...createInternshipAdvisorDTO,
        user: internshipAdvisorUser,
      },
      req.user.campusId,
    );

    await this.emailService.sendConfirmationEmail({
      to: internshipAdvisorUser.email,
      name: internshipAdvisor.firstName,
      confirmationLink: `${environment().links.accountConfimationPrefixLink}${
        internshipAdvisorUser.confirmationId
      }`,
    });

    return internshipAdvisor;
  }

  @Put(':id')
  updated(
    @Param('id') id: string,
    @Body() updateCourseDTO: UpdateInternshipAdvisorDTO,
  ): Promise<InternshipAdvisor> {
    return this.internshipAdvisorService.update(id, updateCourseDTO);
  }
}
