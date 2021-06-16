import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { RequestWithQueryInfo } from 'src/common/interfaces/request-query-info.interface';
import { ReportsService } from 'src/reports/reports.service';
import { CreateInternDTO } from './dto/create-intern.dto';
import { UpdateInternDTO } from './dto/update-intern.dto';
import { Intern } from './intern.entity';
import { InternsService } from './interns.service';

@Controller('interns')
export class InternsController {
  constructor(
    private readonly internsService: InternsService,
    private readonly reportsService: ReportsService,
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

  @Get('/me')
  getSignedInInternInfo(@Req() req: RequestWithQueryInfo) {
    return this.internsService.getInternInfo(req.user.email);
  }

  @Get('/reports')
  getInternReports(@Req() req: RequestWithQueryInfo) {
    const { skip, take } = req.queryInfo;
    return this.reportsService.getInternReports(req.user.email, skip, take);
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
    return this.internsService.create(createInternDTO, req.user.campusId);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourseDTO: UpdateInternDTO,
  ): Promise<Intern> {
    return this.internsService.update(id, updateCourseDTO);
  }
}
