import { Controller, Get, Post, Req } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { RequestWithQueryInfo } from 'src/common/interfaces/request-query-info.interface';
import { EmailsService } from 'src/emails/emails.service';
import { CampusAdmin } from './campus-admin.entity';
import { CampusAdminService } from './campus-admin.service';
import { CreateCampusAdminDTO } from './dto/create-campus-admin.dto';

@Controller('campus-admin')
export class CampusAdminController {
  constructor(private readonly campusAdminService: CampusAdminService, private readonly emailService: EmailsService){}

  @Get()
  findAll(@Req() req: RequestWithQueryInfo): Promise<[CampusAdmin[], number]> {
    const { order, skip, filter, take } = req.queryInfo;
    return this.campusAdminService.findAll(order, skip, take, filter);
  }

  @Post()
  async create(@Body() createCampusDTO: CreateCampusAdminDTO): Promise<CampusAdmin> {
    const campusAdmin = await this.campusAdminService.create(createCampusDTO);
    await this.emailService.sendConfirmationEmail({
      to: campusAdmin.email,
      name: campusAdmin.name,
      confirmationLink: `localhost:3001/finish-create/${campusAdmin.confirmationId}`,
    });

    return campusAdmin;
  }
}
