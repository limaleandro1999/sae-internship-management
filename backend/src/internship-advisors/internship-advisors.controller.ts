import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { RequestWithQueryInfo } from 'src/common/interfaces/request-query-info.interface';
import { EmailsService } from 'src/emails/emails.service';
import { UserType } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { CreateInternshipAdvisorDTO } from './dto/create-internship-advisor.dto';
import { InternshipAdvisor } from './internship-advisor.entity';
import { InternshipAdvisorsService } from './internship-advisors.service';

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
      confirmationLink: `http://localhost:3001/account-confirmation/${internshipAdvisorUser.confirmationId}`,
    });

    return internshipAdvisor;
  }
}