import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { RequestWithQueryInfo } from 'src/common/interfaces/request-query-info.interface';
import { ReportsService } from 'src/reports/reports.service';
import { UsersService } from 'src/users/users.service';
import { CreateInternDTO } from './dto/create-intern.dto';
import { UpdateInternDTO } from './dto/update-intern.dto';
import { ClassesSchedule } from './interfaces/classes-schedule.interface';
import { Intern } from './intern.entity';
import { InternsService } from './interns.service';

@Controller('interns')
export class InternsController {
  constructor(
    private readonly internsService: InternsService,
    private readonly reportsService: ReportsService,
    private readonly userService: UsersService,
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

  @Get('/classes')
  async getInternClassesSchedule(@Req() req: RequestWithQueryInfo) {
    const classes = Object.values(
      await this.internsService.getInternClasses(req.user.email),
    ).map((classDay, index) => ({ ...classDay, id: index }));
    return [Object.values(classes), 5];
  }

  /**
   * It's a hack so react admin can fetch the classes schedule
   * Sorry for that, I was in a hurry to finish TCC
   */
  @Get('/classes/:id')
  async getInternClassesScheduleById(@Req() req: RequestWithQueryInfo) {
    return {
      ...(await this.internsService.getInternClasses(req.user.email)),
      id: 1,
    };
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

  /**
   * It doesn't use :id, it's just a hack to react admin. when it does a PUT request mandatorily has to send the :id
   * Sorry for that, I was in a hurry to finish TCC
   */
  @Put('/classes/:id')
  async updateClasses(
    @Req() req: RequestWithQueryInfo,
    @Body() classesSchedule: ClassesSchedule,
  ): Promise<Intern> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    delete classesSchedule.id;

    const user = await this.userService.findUser(req.user.email);
    return this.internsService.update(user?.intern?.id, { classesSchedule });
  }
}
