import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { resolve } from 'path';
import { Public } from 'src/common/decorators/public.decorator';
import { editFileName } from 'src/common/utils';
import environment from 'src/common/environment';
import { RequestWithQueryInfo } from 'src/common/interfaces/request-query-info.interface';
import { UpdateMonthlyReportDTO } from 'src/reports/dto/update-monthly-report.dto';
import { MonthlyReport } from 'src/reports/monthly-report.entity';
import { ReportsService } from 'src/reports/reports.service';
import { CreateTaskDTO } from 'src/tasks/dto/create-task-dto';
import { Task } from 'src/tasks/task.entity';
import { TasksService } from 'src/tasks/tasks.service';
import { UsersService } from 'src/users/users.service';
import { CreateInternDTO } from './dto/create-intern.dto';
import { UpdateInternDTO } from './dto/update-intern.dto';
import { ClassesSchedule } from './interfaces/classes-schedule.interface';
import { Intern } from './intern.entity';
import { InternsService } from './interns.service';
import * as dayjs from 'dayjs';

@Controller('interns')
export class InternsController {
  constructor(
    private readonly internsService: InternsService,
    private readonly reportsService: ReportsService,
    private readonly userService: UsersService,
    private readonly tasksService: TasksService,
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

  @Get('/semester-reports')
  getSemesterReports(@Req() req: RequestWithQueryInfo) {
    const { skip, take } = req.queryInfo;
    return this.reportsService.getInternSemesterReports(
      req.user.email,
      skip,
      take,
    );
  }

  @Get('/semester-reports/:id')
  getSemesterReport(@Param('id') id: string) {
    return this.reportsService.getMonthlyReportById(id);
  }

  @Get('/monthly-reports')
  getMonthlyReports(@Req() req: RequestWithQueryInfo) {
    const { skip, take } = req.queryInfo;
    return this.reportsService.getInternMonthlyReports(
      req.user.email,
      skip,
      take,
    );
  }

  @Public()
  @Get('/monthly-reports/:id/report-file')
  async getMonthlyReportFile(@Param('id') id: string, @Res() res: Response) {
    const monthlyReport = await this.reportsService.getMonthlyReportById(id);
    return res.sendFile(monthlyReport.reportFileUrl);
  }

  @Public()
  @Get('/monthly-reports/:id/generate-file')
  async generateMonthlyReportFile(
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const generatedFile = await this.reportsService.generateMonthlyReportFile(
      id,
    );
    const monthlyReport = await this.reportsService.getMonthlyReportById(id);
    const filename = `${
      (<Intern>monthlyReport?.internshipProcess?.intern).name
    } - ${dayjs(monthlyReport.startDate).format('MM-YYYY')}.docx`;

    res.set(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    );
    res.set('Content-Disposition', `attachment; filename=${filename}`);
    return res.end(generatedFile);
  }

  @Get('/monthly-reports/:id')
  async getMonthlyReport(@Param('id') id: string) {
    const monthlyReport = await this.reportsService.getMonthlyReportById(id);
    monthlyReport.reportFileUrl = `${environment().server.protocol}://${
      environment().server.host
    }:${environment().server.port}/interns/monthly-reports/${id}/report-file`;
    return monthlyReport;
  }

  @Get('/classes')
  async getInternClassesSchedule(@Req() req: RequestWithQueryInfo) {
    const classes = Object.values(
      await this.internsService.getInternClasses(req.user.email),
    ).map((classDay, index) => ({ ...classDay, id: index }));
    return [Object.values(classes), 5];
  }

  @Get('/tasks')
  getTasks(@Req() req: RequestWithQueryInfo) {
    const { skip, filter, take } = req.queryInfo;
    return this.internsService.getInternTasks(
      req.user.email,
      skip,
      take,
      filter,
    );
  }

  @Get('/tasks/:id')
  async getTask(@Param('id') id: string, @Req() req: RequestWithQueryInfo) {
    const intern = await this.internsService.getInternInfo(req.user.email);

    // Date comes like "2021-04-13" so there is a "-" on the 4th index
    const isDateFormat = id.includes('-', 4);

    if (isDateFormat) {
      return {
        id,
        activity: '',
        date: id,
        observation: '',
        workedHoursAmount: '',
        internshipProcess: intern?.internshipProcesses[0],
      };
    } else {
      return this.tasksService.findOne(id);
    }
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

  @Put('/tasks/:id')
  async updateTask(@Body() taskDTO: CreateTaskDTO): Promise<Task> {
    return this.tasksService.createTask(taskDTO);
  }

  @Put('/monthly-reports/:id')
  @UseInterceptors(
    FileInterceptor('report-file', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
    }),
  )
  updateMonthlyReport(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<MonthlyReport> {
    const monthlyReport: UpdateMonthlyReportDTO = {
      reportFileUrl: resolve(file.path),
    };
    return this.reportsService.updateMonthlyReport(id, monthlyReport);
  }
}
