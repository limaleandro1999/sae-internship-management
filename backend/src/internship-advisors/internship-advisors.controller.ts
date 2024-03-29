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
import { InternshipProcess } from 'src/internship-processes/internship-process.entity';
import { InternshipProcessesService } from 'src/internship-processes/internship-processes.service';
import { InternsService } from 'src/interns/interns.service';
import { SemesterReport } from 'src/reports/semester-report.entity';
import { MonthlyReport } from 'src/reports/monthly-report.entity';
import { ReportsService } from 'src/reports/reports.service';
import { UpdateSemesterReportDTO } from 'src/reports/dto/update-semester-report.dto';
import { UpdateMonthlyReportDTO } from 'src/reports/dto/update-monthly-report.dto';

@Controller('internship-advisors')
export class InternshipAdvisorsController {
  constructor(
    private readonly internshipAdvisorService: InternshipAdvisorsService,
    private readonly internshipProcessesService: InternshipProcessesService,
    private readonly reportsService: ReportsService,
    private readonly internsService: InternsService,
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

  @Get('/internship-processes')
  getInternshipProcesses(
    @Req() req: RequestWithQueryInfo,
  ): Promise<[InternshipProcess[], number]> {
    const { order, skip, take } = req.queryInfo;
    return this.internshipAdvisorService.getInternshipProcesses(
      req.user.email,
      order,
      skip,
      take,
    );
  }

  @Get('/semester-reports')
  getSemesterReports(
    @Req() req: RequestWithQueryInfo,
  ): Promise<[SemesterReport[], number]> {
    const { order, skip, take } = req.queryInfo;
    return this.internshipAdvisorService.getSemesterReports(
      req.user.email,
      order,
      skip,
      take,
    );
  }

  @Get('/monthly-reports')
  getMonthlyReports(
    @Req() req: RequestWithQueryInfo,
  ): Promise<[MonthlyReport[], number]> {
    const { order, skip, take } = req.queryInfo;
    return this.internshipAdvisorService.getMonthlyReports(
      req.user.email,
      order,
      skip,
      take,
    );
  }

  @Get('/semester-reports/:id')
  async getSemesterReport(@Param('id') id: string) {
    const semesterReport = await this.reportsService.getSemesterReportById(id);
    semesterReport.reportFileUrl = this.reportsService.getReportDownloadLink(
      semesterReport,
    );

    return semesterReport;
  }

  @Get('/monthly-reports/:id')
  async getMonthlyReport(@Param('id') id: string) {
    const monthlyReport = await this.reportsService.getMonthlyReportById(id);
    monthlyReport.reportFileUrl = this.reportsService.getReportDownloadLink(
      monthlyReport,
    );

    return monthlyReport;
  }

  @Get('/internship-processes/:id/tasks')
  async getInternshipProcessTasks(
    @Param('id') id: string,
    @Req() req: RequestWithQueryInfo,
  ) {
    const { skip, filter, take } = req.queryInfo;
    const internshipProcess = await this.internshipProcessesService.findOne(id);

    return this.internsService.getInternTasks(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      internshipProcess?.intern?.user?.email,
      skip,
      take,
      filter,
    );
  }

  @Get('/internship-processes/:id')
  getInternshipProcessById(
    @Param('id') id: string,
  ): Promise<InternshipProcess> {
    return this.internshipProcessesService.findOne(id);
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
      name: internshipAdvisor.name,
      confirmationLink: `${environment().links.accountConfimationPrefixLink}${
        internshipAdvisorUser.confirmationId
      }`,
    });

    return internshipAdvisor;
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourseDTO: UpdateInternshipAdvisorDTO,
  ): Promise<InternshipAdvisor> {
    return this.internshipAdvisorService.update(id, updateCourseDTO);
  }

  @Put('/semester-reports/:id')
  updateSemesterReport(
    @Param('id') id: string,
    @Body() updateCourseDTO: UpdateSemesterReportDTO,
  ): Promise<SemesterReport> {
    return this.reportsService.updateSemesterReport(id, updateCourseDTO);
  }

  @Put('/monthly-reports/:id')
  updateMonthlyReport(
    @Param('id') id: string,
    @Body() updateCourseDTO: UpdateMonthlyReportDTO,
  ): Promise<MonthlyReport> {
    return this.reportsService.updateMonthlyReport(id, updateCourseDTO);
  }
}
