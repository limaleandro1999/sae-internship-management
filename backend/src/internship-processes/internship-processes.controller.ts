import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { RequestWithQueryInfo } from 'src/common/interfaces/request-query-info.interface';
import { CreateInternshipProcessDTO } from './dto/create-interniship-process.dto';
import { InternshipProcess } from './internship-process.entity';
import { InternshipProcessesService } from './internship-processes.service';

@Controller('internship-processes')
export class InternshipProcessesController {
  constructor(
    private readonly internshipProcessesService: InternshipProcessesService,
  ) {}
  @Get()
  findAll(
    @Req() req: RequestWithQueryInfo,
  ): Promise<[InternshipProcess[], number]> {
    const { order, skip, filter, take } = req.queryInfo;
    return this.internshipProcessesService.findAll(
      order,
      skip,
      take,
      filter,
      req.user.campusId,
    );
  }

  @Post()
  async create(
    @Req() req,
    @Body() createInternshipProcessDTO: CreateInternshipProcessDTO,
  ) {
    return this.internshipProcessesService.create(
      createInternshipProcessDTO,
      req.user.campusId,
    );
  }
}
