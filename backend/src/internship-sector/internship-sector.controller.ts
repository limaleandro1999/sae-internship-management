import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { RequestWithQueryInfo } from 'src/common/interfaces/request-query-info.interface';
import { EmailsService } from 'src/emails/emails.service';
import { UserType } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { CreateInternshipSectorDTO } from './dto/create-internship-sector.dto';
import { InternshipSector } from './internship-sector.entity';
import { InternshipSectorService } from './internship-sector.service';

import environment from '../common/environment';

@Controller('internship-sector')
export class InternshipSectorController {
  constructor(
    private readonly internshipSectorService: InternshipSectorService,
    private readonly userService: UsersService,
    private readonly emailService: EmailsService,
  ) {}

  @Get()
  findAll(
    @Req() req: RequestWithQueryInfo,
  ): Promise<[InternshipSector[], number]> {
    const { order, skip, filter, take } = req.queryInfo;
    return this.internshipSectorService.findAll(
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
    @Body() createInternshipSectorDTO: CreateInternshipSectorDTO,
  ): Promise<InternshipSector> {
    const internshipSectorUser = await this.userService.create({
      email: createInternshipSectorDTO.email,
      type: UserType.INTERNSHIP_SECTOR,
      active: false,
    });
    const internshipSector = await this.internshipSectorService.create(
      {
        ...createInternshipSectorDTO,
        user: internshipSectorUser,
      },
      req.user.campusId,
    );

    await this.emailService.sendConfirmationEmail({
      to: internshipSectorUser.email,
      name: internshipSector.firstName,
      confirmationLink: `${environment().links.accountConfimationPrefixLink}${
        internshipSectorUser.confirmationId
      }`,
    });

    return internshipSector;
  }
}
