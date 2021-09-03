import { Controller, Get, Post, Req } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';

import { RequestWithQueryInfo } from 'src/common/interfaces/request-query-info.interface';
import { EmailsService } from 'src/emails/emails.service';
import { UserType } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { CampusAdmin } from './campus-admin.entity';
import { CampusAdminService } from './campus-admin.service';
import { CreateCampusAdminDTO } from './dto/create-campus-admin.dto';

import environment from '../common/environment';

@Controller('campus-admin')
export class CampusAdminController {
  constructor(
    private readonly campusAdminService: CampusAdminService,
    private readonly userService: UsersService,
    private readonly emailService: EmailsService,
  ) {}

  @Get()
  async findAll(
    @Req() req: RequestWithQueryInfo,
  ): Promise<[CampusAdmin[], number]> {
    const { order, skip, filter, take } = req.queryInfo;

    // TODO: Use roles instead of this logic
    const user = await this.userService.findUser(req.user.email);

    if (user.type === UserType.ADMIN) {
      return this.campusAdminService.findAll(order, skip, take, filter);
    }

    return this.campusAdminService.findAllByCampusId(
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
    @Body() createCampusAdminDTO: CreateCampusAdminDTO,
  ): Promise<CampusAdmin> {
    const campusAdminUser = await this.userService.create({
      email: createCampusAdminDTO.email,
      type: UserType.CAMPUS_ADMIN,
      active: false,
    });
    const campusAdmin = await this.campusAdminService.create(
      {
        ...createCampusAdminDTO,
        user: campusAdminUser,
      },
      req.user.campusId,
    );

    await this.emailService.sendConfirmationEmail({
      to: campusAdminUser.email,
      name: campusAdmin.name,
      confirmationLink: `${environment().links.accountConfimationPrefixLink}${
        campusAdminUser.confirmationId
      }`,
    });

    return campusAdmin;
  }
}
