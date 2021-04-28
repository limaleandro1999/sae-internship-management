import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import environment from 'src/common/environment';
import { RequestWithQueryInfo } from 'src/common/interfaces/request-query-info.interface';
import { EmailsService } from 'src/emails/emails.service';
import { UserType } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { CreateInternDTO } from './dto/create-intern.dto';
import { UpdateInternDTO } from './dto/update-intern.dto';
import { Intern } from './intern.entity';
import { InternsService } from './interns.service';

@Controller('interns')
export class InternsController {
  constructor(
    private readonly internsService: InternsService,
    private readonly userService: UsersService,
    private readonly emailService: EmailsService,
  ) {}

  @Get()
  findAll(@Req() req: RequestWithQueryInfo): Promise<[Intern[], number]> {
    const { order, skip, filter, take } = req.queryInfo;
    return this.internsService.findAll(
      order,
      skip,
      take,
      filter,
      req.user.campusId,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Intern> {
    return this.internsService.findOne(id);
  }

  @Post()
  async create(
    @Req() req: RequestWithQueryInfo,
    @Body() createInternDTO: CreateInternDTO,
  ): Promise<Intern> {
    const internsUser = await this.userService.create({
      email: createInternDTO.email,
      type: UserType.INTERNSHIP_ADVISOR,
      active: false,
    });
    const interns = await this.internsService.create(
      {
        ...createInternDTO,
        user: internsUser,
      },
      req.user.campusId,
    );

    await this.emailService.sendConfirmationEmail({
      to: internsUser.email,
      name: interns.name,
      confirmationLink: `${environment().links.accountConfimationPrefixLink}${
        internsUser.confirmationId
      }`,
    });

    return interns;
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourseDTO: UpdateInternDTO,
  ): Promise<Intern> {
    return this.internsService.update(id, updateCourseDTO);
  }
}
